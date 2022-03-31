'use strict'

const outerdiv=document.getElementById('maindivcontent');
///display fun.......................
const disdata=async function(){
  const sort = document.getElementById("sort");
try {
const gdata=await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
// .then(res=>await res.json())
// .then(cdata=>console.log(cdata));
const cdata=await gdata.json();
//console.log(cdata);

////change order.....................
console.log(sort.value)
let arr1='';
if(sort.value === 'asc')
{
  arr1=[...cdata].reverse();
}
 else arr1=cdata;
while(outerdiv.firstChild){
  outerdiv.removeChild(outerdiv.firstChild);
}

//////traversing of array.................
console.log(arr1.length);
arr1.forEach((getdata,i)=>{
 // console.log(getdata);
  const innerdiv1=document.createElement("div");
  innerdiv1.className="innerdiv1";
  innerdiv1.id=`${getdata.name}`;

const innerdivImg=document.createElement("div");
innerdivImg.className = 'ImgName';
const img=document.createElement("img");
img.className="img";
img.src=getdata.image;
innerdivImg.appendChild(img);
const innerdivName=document.createElement("div");
innerdivName.className="name"
innerdivName.innerText=`${getdata.name}`;
innerdivImg.appendChild(innerdivName);
innerdiv1.appendChild(innerdivImg);

const innerdivSymbole=document.createElement("div");
innerdivSymbole.className = "column1";
innerdivSymbole.innerText=`${(getdata.symbol).toUpperCase()}`;
innerdiv1.appendChild(innerdivSymbole);

const innerdivPrice=document.createElement("div");
innerdivPrice.className="column2";
innerdivPrice.innerText=`$ ${getdata.current_price.toFixed(2)}`;
innerdiv1.appendChild(innerdivPrice);

const innerdivvolume=document.createElement("div");
innerdivvolume.className="column3";
innerdivvolume.innerText=`$${getdata.total_volume.toLocaleString('en-us')}`;
innerdiv1.appendChild(innerdivvolume);

const innerdivmarket=document.createElement("div");
innerdivmarket.className="column4";
if(getdata.market_cap_change_percentage_24h>0)
 {  
    innerdivmarket.style.color="green";
    innerdivmarket.innerText=`Per: ${Math.abs(getdata.market_cap_change_percentage_24h.toFixed(2))} %👍`;
 } else if(getdata.market_cap_change_percentage_24h<0)
 {
   innerdivmarket.style.color="red";
   innerdivmarket.innerText=`Per: ${Math.abs(getdata.market_cap_change_percentage_24h.toFixed(2))} %👎`;
}
innerdiv1.appendChild(innerdivmarket);

const innerdivmcap=document.createElement("div");
innerdivmcap.className="column5";
innerdivmcap.innerText=`Mrk Cap: $${getdata.market_cap.toLocaleString('en-us')}`;
innerdiv1.appendChild(innerdivmcap);

/////main outerdiv...........
outerdiv.appendChild(innerdiv1);
});
}
catch(error){
  console.log(`Error:${error}`);
}
}

const data=disdata();
// console.log(data);

/////////////search 
const search = document.getElementById('search');
search.addEventListener('input',function(){
  const value=search.value.toLowerCase();
  // console.log(value);
  const searchText= document.getElementsByClassName('name');
  // console.log(searchText);
  const searchSymbol= document.getElementsByClassName('column1');
  // console.log(searchSymbol);
  let i=0;
  while(i<searchText.length){
   let textValue = searchText[i].textContent.toLowerCase();
   console.log(textValue);
   let symbValue = searchSymbol[i].textContent.toLowerCase();
   console.log(symbValue);

  //  //check for match text

   if(!(  (textValue.includes(value)) || (symbValue.includes(value)) ))
   {  document.getElementById(`${searchText[i].textContent}`).classList.add('hidden');
   }
   else
   {
       document.getElementById(`${searchText[i].textContent}`).classList.remove('hidden');
   }
   i++;
  }

});

