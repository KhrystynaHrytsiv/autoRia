import {CronJob} from "cron";
import {currencyService} from "../services/currencyService";
import {exchangeRateRepository} from "../repositories/exchangeRateRepository";

const handler = async () =>{
    const rates = await currencyService.getExchangeRates();
    await exchangeRateRepository.update(rates);
}

export const currencyCron = new CronJob("* 0 8 * * *", handler);