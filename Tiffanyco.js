const puppeteer= require ('puppeteer');
let tiffanyco=(async (linkUrl) =>{
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
   await page.goto(linkUrl,{waitUntil:'networkidle2'});// ,makesure everything is loaded

   try{
 
 
  // Product price
  await page.waitForSelector(".product-description__addtobag_btn_text-static_price-wrapper_price",{visible:true});
  const price=await (await page.$eval('.product-description__addtobag_btn_text-static_price-wrapper_price',span=>span.textContent)).split('$');
const OriginalPrice=price[1]
 console.log('Original Price=$'+OriginalPrice);
  console.log(parseFloat(OriginalPrice.replace(/,/g,'')));

  
  //ProductModel
  await page.waitForSelector(".product-description__content",{visible:true});
  const ProductTitle=await page.$eval('.product-description__content',span=>span.textContent);
  console.log('Model ='+ProductTitle);
  
  //ImageSource
 await page.waitForSelector("img");
  var imgSrc=await page.$$eval('img',img=>img[35].getAttribute('src'));
  console.log('Image source : '+imgSrc)
  
  
  await browser.close();
}
catch(err){
  console.log("Element not found");
}
});

tiffanyco('https://www.tiffany.com/fragrance/tiffany-fragrance/tiffany-eau-de-parfum-intense-63220159/');



