const puppeteer= require ('puppeteer');
let silverprice=(async (linkUrl) =>{
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();

   await page.goto(linkUrl,{waitUntil:'networkidle2'});// ,makesure everything is loaded

   try{
 
 
  // Silver price
  await page.waitForSelector("#gpxTickTab_gr_price",{visible:true});
  var price=await (await page.$eval('#gpxTickTab_gr_price',span=>span.textContent));
 console.log('Silver Price='+price);
  console.log(parseFloat(price.replace(/,/g,'')));

  //Title
  const title=await page.$eval('#pog_title a',span=>span.textContent);
  console.log(title);
   
  
  //SelectedCurrency
 // await page.waitForSelector(".table-responsive",{visible:true});
  const details=await page.$eval('.table-responsive tr:nth-child(2) td:nth-child(1)',span=>span.textContent);
  console.log(title + '.....>>.....' + details+' '+price);
  
  

  
  await browser.close();
}
catch(err){
  console.log("Element not found");
}
});

silverprice('https://silverprice.org/silver-price-egypt.html');



