/* eslint-disable no-unused-vars */
import httpStatus from 'http-status';
import puppeteer from 'puppeteer';
import AppError from '../../errors/AppError';
import { TScrappedData } from './hypestat.interface';
import { ScrappedModel } from './hypestat.model';

//save in DB
const saveDataInDB = async (data: TScrappedData) => {
  if (!data?.domain) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Domain is required');
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.goto(`https://hypestat.com/info/${data.domain}`, {
      waitUntil: 'networkidle2',
      timeout: 60000,
    });

    await page.waitForSelector('.traffic_sources_report', { timeout: 30000 });

    const trafficSources = await page.evaluate(() => {
      const container = document.querySelector('.traffic_sources_report');
      if (!container) return [];

      const dtElements = container.querySelectorAll('dt');
      const ddElements = container.querySelectorAll('dd');

      const results = [];

      for (let i = 0; i < dtElements.length && i < ddElements.length; i++) {
        const source = dtElements[i].textContent?.replace(':', '').trim() || '';
        const percentageText =
          ddElements[i].querySelector('span')?.textContent?.trim() || '0%';
        const percentage = parseFloat(percentageText.replace('%', '')) || 0;

        results.push({ source, percentage });
      }

      return results;
    });

    if (!trafficSources || trafficSources.length === 0) {
      throw new AppError(httpStatus.NOT_FOUND, 'Traffic sources not found');
    }

    const result = await ScrappedModel.create({
      domain: data.domain,
      info: trafficSources,
    });

    return result;
  } catch (error) {
    console.error('Scraping Error:', error);
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Scraping failed');
  } finally {
    await browser.close();
  }
};

export const hypeStatServices = {
  saveDataInDB,
};
