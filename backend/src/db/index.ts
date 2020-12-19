import Knex from 'knex';
import { ConnectionType } from '../utils/types';

/**
 * Abstracts operations against the database
 */
class Database {
  config: any;

  queryBuilder: any;

  constructor(config: ConnectionType) {
    this.config = config;
  }

  /**
     * Connects to the database and returns a self reference
     *
     * @returns {promise}
     */
  async connect() {
    this.queryBuilder = Knex({ client: 'mysql2', connection: this.config });

    return this;
  }

  /**
     * async utility for getting a transaction object from knex
     *
     * @returns {undefined}
     */
  async newTransaction() {
    return new Promise((resolve, reject) => {
      try {
        return this.queryBuilder.transaction((txn: any) => resolve(txn));
      } catch (err) {
        return reject(err);
      }
    });
  }

  /**
     * Check whether the database connection has basic functionality
     *
     * @returns {boolean}
     */
  async isConnected() {
    try {
      const result = await this.queryBuilder.raw('SELECT 1 + 1 AS result');
      if (result) {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  // /**
  //    * Gets the set of enabled transfer rules
  //    *
  //    * @returns {promise} - all enabled transfer rules
  //    */
  // async getTransferRules() {
  //   try {
  //     const rows = await this.queryBuilder('transferRules')
  //       .where('enabled', true)
  //       .select();
  //     return rows.map((r) => JSON.parse(r.rule));
  //   } catch (err) {
  //     this.writeLog(`Error in getTransferRules: ${getStackOrInspect(err)}`);
  //     throw ErrorHandler.Factory.reformatFSPIOPError(err);
  //   }
  // }

  // /**
  //    * Gets the id of the specified transaction initiator type
  //    *
  //    * @returns {promise} - id of the transactionInitiatorType
  //    */
  // async getInitiatorType(initiatorType) {
  //   try {
  //     const rows = await this.queryBuilder('transactionInitiatorType')
  //       .where('name', initiatorType)
  //       .select();

  //     if ((!rows) || rows.length < 1) {
  //       // initiatorType does not exist, this is an error
  //       throw ErrorHandler.Factory.createFSPIOPError(ErrorHandler.Enums.FSPIOPErrorCodes.VALIDATION_ERROR, `Unsupported initiatorType '${initiatorType}'`);
  //     }
  //     return rows[0].transactionInitiatorTypeId;
  //   } catch (err) {
  //     this.writeLog(`Error in getInitiatorType: ${getStackOrInspect(err)}`);
  //     throw ErrorHandler.Factory.reformatFSPIOPError(err);
  //   }
  // }

  // /**
  //    * Gets the id of the specified transaction initiator
  //    *
  //    * @returns {promise} - id of the transactionInitiator
  //    */
  // async getInitiator(initiator) {
  //   try {
  //     const rows = await this.queryBuilder('transactionInitiator')
  //       .where('name', initiator)
  //       .select();

  //     if ((!rows) || rows.length < 1) {
  //       // initiator does not exist, this is an error
  //       throw ErrorHandler.Factory.createFSPIOPError(ErrorHandler.Enums.FSPIOPErrorCodes.VALIDATION_ERROR, `Unsupported initiator '${initiator}'`);
  //     }
  //     return rows[0].transactionInitiatorId;
  //   } catch (err) {
  //     this.writeLog(`Error in getInitiator: ${getStackOrInspect(err)}`);
  //     throw ErrorHandler.Factory.reformatFSPIOPError(err);
  //   }
  // }

  // /**
  //    * Gets the id of the specified transaction scenario
  //    *
  //    * @returns {promise} - id of the transactionScenario
  //    */
  // async getScenario(scenario) {
  //   try {
  //     const rows = await this.queryBuilder('transactionScenario')
  //       .where('name', scenario)
  //       .select();

  //     if ((!rows) || rows.length < 1) {
  //       // scenario does not exist, this is an error
  //       throw new Error(`Unsupported transaction scenario '${scenario}'`);
  //     }
  //     return rows[0].transactionScenarioId;
  //   } catch (err) {
  //     this.writeLog(`Error in getScenario: ${getStackOrInspect(err)}`);
  //     throw ErrorHandler.Factory.reformatFSPIOPError(err);
  //   }
  // }

  // /**
  //    * Gets the id of the specified transaction sub-scenario
  //    *
  //    * @returns {promise} - id of the transactionSubScenario
  //    */
  // async getSubScenario(subScenario) {
  //   try {
  //     const rows = await this.queryBuilder('transactionSubScenario')
  //       .where('name', subScenario)
  //       .select();

  //     if ((!rows) || rows.length < 1) {
  //       // sub-scenario does not exist, this is an error
  //       throw ErrorHandler.Factory.createFSPIOPError(ErrorHandler.Enums.FSPIOPErrorCodes.VALIDATION_ERROR, `Unsupported transaction sub-scenario '${subScenario}'`);
  //     }
  //     return rows[0].transactionSubScenarioId;
  //   } catch (err) {
  //     this.writeLog(`Error in getSubScenario: ${getStackOrInspect(err)}`);
  //     throw ErrorHandler.Factory.reformatFSPIOPError(err);
  //   }
  // }

  // /**
  //    * Gets the id of the specified amount type
  //    *
  //    * @returns {promise} - id of the amountType
  //    */
  // async getAmountType(amountType: any) {
  //   try {
  //     const rows = await this.queryBuilder('amountType')
  //       .where('name', amountType)
  //       .select();

  //     if ((!rows) || rows.length < 1) {
  //       // amount type does not exist, this is an error
  //       throw ErrorHandler.Factory.createFSPIOPError(ErrorHandler.Enums.FSPIOPErrorCodes.VALIDATION_ERROR, `Unsupported amount type '${amountType}'`);
  //     }
  //     return rows[0].amountTypeId;
  //   } catch (err) {
  //     this.writeLog(`Error in getAmountType: ${getStackOrInspect(err)}`);
  //     throw ErrorHandler.Factory.reformatFSPIOPError(err);
  //   }
  // }
}

export default Database;
