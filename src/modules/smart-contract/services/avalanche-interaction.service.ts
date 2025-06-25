import { Injectable, Logger } from '@nestjs/common';
import { Contract } from 'ethers';
import { AvalancheProviderService } from './avalanche-provider.service';

interface CompactLocation {
  lat: number;
  lon: number;
  // Add other fields if they exist in your smart contract's CompactLocation struct
}

@Injectable()
export class AvalancheInteractionService {
  private readonly logger = new Logger(AvalancheInteractionService.name);
  private readonly readOnlyContract: Contract;
  private readonly writableContract: Contract;

  constructor(private readonly providerService: AvalancheProviderService) {
    this.logger.log('Initializing AvalancheInteractionService...');
    this.readOnlyContract = this.providerService.readOnlyContract;
    this.writableContract = this.providerService.writableContract;
  }

  /**
   * Processes a payout to a user for a specific claim.
   * This calls the `processPayout` function on the smart contract.
   * @param user The address of the user to receive the payout.
   * @param claimId The unique identifier for the claim.
   * @param amount The payout amount.
   * @param tokenAddress The address of the ERC20 token for payout, or address(0) for AVAX.
   */
  public async processPayout(
    user: string,
    claimId: string,
    amount: bigint,
    tokenAddress: string,
  ) {
    if (!this.writableContract) {
      const errorMessage =
        'Writable contract is not initialized. Cannot send transaction.';
      this.logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    try {
      this.logger.log(
        `Attempting to process payout for claim '${claimId}' to user '${user}' with amount ${amount.toString()} of token ${tokenAddress}.`,
      );

      const tx = await this.writableContract.processPayout(
        user,
        claimId,
        amount,
        tokenAddress,
      );

      this.logger.log(`Payout transaction sent. Hash: ${tx.hash}`);
      const receipt = await tx.wait();
      this.logger.log(
        `Payout transaction confirmed in block number: ${receipt.blockNumber}`,
      );

      return receipt;
    } catch (error) {
      this.logger.error(
        `Error processing payout for claim '${claimId}':`,
        error,
      );
    }
  }

  /**
   * Deactivates a location in the insurance contract.
   * This is an owner-only function that marks a specific location as inactive.
   * @param lat Latitude coordinate (as int32)
   * @param lon Longitude coordinate (as int32)
   */
  public async deactivateLocation(lat: number, lon: number) {
    if (!this.writableContract) {
      const errorMessage =
        'Writable contract is not initialized. Cannot send transaction.';
      this.logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    try {
      this.logger.log(
        `Attempting to deactivate location at coordinates (${lat}, ${lon})`,
      );

      const tx = await this.writableContract.deactivateLocation(lat, lon);

      this.logger.log(`Deactivation transaction sent. Hash: ${tx.hash}`);
      const receipt = await tx.wait();
      this.logger.log(
        `Location deactivation confirmed in block number: ${receipt.blockNumber}`,
      );

      return receipt;
    } catch (error) {
      this.logger.error(
        `Error deactivating location at coordinates (${lat}, ${lon}):`,
        error,
      );
    }
  }

  /**
   * Gets all active locations from the insurance contract.
   * This is a view function that returns an array of active CompactLocation structs.
   * @returns An array of CompactLocation objects
   */
  public async getAllActiveLocations(): Promise<CompactLocation[]> {
    this.logger.log('Fetching all active locations...');
    const locations = await this.readOnlyContract.getAllActiveLocations();
    this.logger.log(`Found ${locations.length} active locations.`);
    return locations;
  }
}
