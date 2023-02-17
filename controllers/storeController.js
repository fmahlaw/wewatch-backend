import express from "express";
import request from "request";
import cheerio from "cheerio";

const router = express.Router();
const result = [];

export const getStore = async (req, res) => {
  let { name } = req.body;

  name = name
    .slice(26)
    .trim()
    .replace(/[0-9]/g, "")
    .replace(/['/-[\]']+/g, "");

  name = `https://www.tokopedia.com/${name}/product?sort=2`;

  request(`${name}`, async function (error, response, html) {
    if (error) {
      console.log("error");
      res.status(400).send("error");
      return;
    }

    const $ = cheerio.load(html);
    const listItems = $('[data-testid="master-product-card"]');

    listItems.each((idx, el) => {
      const nama = $('[data-testid="linkProductName"]', el).text();
      const harga = $('[data-testid="linkProductPrice"]', el).text();
      const link = $("a[href]", el).attr("href");

      result.push({
        number: idx + 1,
        nama: nama,
        harga: harga,
        link: link,
      });
    });

    console.log("success");
    res.send(result.splice(0, 10));
  });
};

export default router;
