const puppeteer= require ('puppeteer');
let iwatch=(async (linkUrl) =>{
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
   await page.goto(linkUrl,{waitUntil:'networkidle2'});// ,makesure everything is loaded

   try{
     //Original Price
     await page.waitForSelector(".product__price",{visible:true});
     const PriceOriginal=(await page.$eval('.product__price',span=>span.textContent)).split('LE');
     const PriceBeforeSale=PriceOriginal[1];
     
     //ProductBrand
     await page.waitForSelector(".product-single__vendor",{visible:true});
     const ProductTitle=await page.$eval('.product-single__vendor',span=>span.textContent);
     
     
     //Printing results
     console.log('Brand ='+ProductTitle);
     
     console.log('Price before sale ='+PriceBeforeSale);
     console.log(parseFloat(PriceBeforeSale.replace(/,/g,'')));

    // ImageSource
     await page.waitForSelector(".photoswipe__image",{visible:true});
     const imgSrc=await page.$eval('.photoswipe__image',img=>img.getAttribute('srcset'));
     
     console.log('Image source : '+imgSrc)
     
      //SalePrice
      await page.waitForSelector(".sale-price",{visible:true});
     const SPrice=await (await page.$eval('.sale-price',span=>span.textContent)).split('LE');
     const SalePrice=SPrice[1];
    
     console.log("SalePrice="+" "+SalePrice);
     console.log(parseFloat(SalePrice.replace(/,/g,'')));
     
     await browser.close();
    }
catch(err){
  console.log("Element not found");
}
});

iwatch('https://i-watch.co/collections/police-men-watches/products/p14838jsu-61');



