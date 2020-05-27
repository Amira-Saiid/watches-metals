const puppeteer= require ('puppeteer');
let azzamwatches=(async (linkUrl) =>{
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
   await page.goto(linkUrl,{waitUntil:'networkidle2'});// ,makesure everything is loaded

   try{

  //CurrentPrice
  await page.waitForSelector("#ProductPrice-product-template",{visible:true});
  const CurrPrice=(await page.$eval('#ProductPrice-product-template',span=>span.textContent)).split('EGP');
  const Price=CurrPrice[1]; 
  console.log('CurrentPrice= '+Price);
  console.log(parseFloat(Price.replace(/,/g,'')));

  
  // ProductModel
  await page.waitForSelector(".product-name",{visible:true});
  const ProductTitle=await page.$eval('.product-name',span=>span.textContent);
  console.log('ProductModel : '+ProductTitle);
  
 // ImageSource
 
 await page.waitForSelector("img");
 var imgSrc=await page.$$eval('img',img=>img[4].getAttribute('src'));
 console.log('Image Source : '+imgSrc)
 
 //Price before sale(if product is on sale)
 await page.waitForSelector("#ComparePrice-product-template",{visible:true});
 const PriceOriginal=(await page.$eval('#ComparePrice-product-template',del=>del.textContent)).split('EGP');
 const PriceOrg= PriceOriginal[1];
 console.log('Price before sale='+PriceOrg);
 console.log(parseFloat(PriceOrg.replace(/,/g,'')));
 
  await browser.close();
}
catch(err){
  console.log("Element not found");
}
});


azzamwatches('https://azzamwatches.com/collections/deals/products/alba-am3573x');







