const puppeteer= require ('puppeteer');
let diamondPrices=(async (linkUrl) =>{
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
   page.setDefaultNavigationTimeout(0);
   await page.goto(linkUrl,{waitUntil:'load'});// ,makesure everything is loaded

   try{
 

//   //Title
const titles=await page.$eval('.ts tr:nth-child(1) td:nth-child(1)',span=>span.textContent);
const _titles=await page.$eval('.ts tr:nth-child(1) td:nth-child(2)',span=>span.textContent);
const __titles=await page.$eval('.ts tr:nth-child(1) td:nth-child(3)',span=>span.textContent);

 
  //details
  const details=await page.$eval('.ts tr th:nth-child(1)',span=>span.textContent);
  const _details=await page.$eval('.ts tr th:nth-child(2)',span=>span.textContent);
  const __details=await page.$eval('.ts tr th:nth-child(3)',span=>span.textContent);

  console.log(details+'--->>---'+titles);
  console.log(_details+'--->>---'+_titles);
  console.log(__details+'--->>---'+__titles);

  await browser.close();
}
catch(err){
  console.log("Element not found");
}
});

diamondPrices('https://www.gold-rate.co.in/diamond-prices/egypt-diamond-price-today/');



