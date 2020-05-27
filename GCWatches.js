const puppeteer= require ('puppeteer');
let gcwatches=(async (linkUrl) =>{
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
   await page.goto(linkUrl,{waitUntil:'networkidle2'});// ,makesure everything is loaded

   try{
     //Product price
     var priceArr=[];
     var price;
  await page.waitForSelector(".price-sales",{visible:true});
  var priceArr=await page.$eval('.price-sales',span=>span.textContent);
  price=priceArr.slice(1);
  console.log('Original Price='+priceArr);
  console.log(parseFloat(price.replace(/,/g,'')));
  
  //Product Model
  await page.waitForSelector(".product-name",{visible:true});
  const ProductTitle=await page.$eval('.product-name',span=>span.textContent);
  console.log("ProductModel="+" "+ProductTitle);
  
  //Image Source
  const imgSrc=await page.$eval('.primary-image',img=>img.getAttribute('src'))
  console.log(imgSrc)
  

  await browser.close();
}
catch(err){
  console.log("Element not found");
}
});

gcwatches('https://shop.gcwatches.com/gc-cablebijou-large-size/Y56002L1MF.html');



