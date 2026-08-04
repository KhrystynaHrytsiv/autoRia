import { CronJob } from "cron";

import { exchangeRateRepository } from "../repositories/exchangeRateRepository";
import { currencyService } from "../services/currencyService";

const handler = async () => {
    const rates = await currencyService.getExchangeRates();
    await exchangeRateRepository.update(rates);
};

export const currencyCron = new CronJob("* 0 8 * * *", handler);
