const puppeteer= require ('puppeteer');
let ddiamonds=(async (linkUrl) =>{
  // var availability=[];
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
   await page.goto(linkUrl,{waitUntil:'networkidle2'});

   try{
     //Product Price
  await page.waitForSelector(".price",{visible:true});
  const price=await page.$eval('.price',span=>span.textContent);
  console.log("Price="+" "+price);
 console.log(parseFloat(price.replace(/,/g,'')));
  

//Product Model
await page.waitForSelector('.product-details',{visible:true});
const ProductTitle=await page.$eval('.product-details h1',span=>span.textContent);
console.log("ProductModel="+" "+ProductTitle);

//Image Source
await page.waitForSelector("img");
  var imgSrc=await page.$$eval('img',img=>img[3].getAttribute('src'));
  console.log('Image source : '+imgSrc)
 

// availability=await page.$x("//a[contains(@class,'single_add_to_cart_button')]");
//   await browser.close();
 }
catch(err){
  console.log("Element not found");
}
// finally{
//    if(availability.length>0) return console.log('Available');
//    else console.log('Out of stock')
// }
});

ddiamonds('https://www.ddiamonds-jewelry.com/shop/diamond-ring-15/');



