let quoteItems={};

function fmt(n){
 return '$'+Number(n).toLocaleString('es-MX',{minimumFractionDigits:2,maximumFractionDigits:2});
}

function renderCatalog(){
 const c=document.getElementById('catalogContainer');
 c.innerHTML=`<div class="prod-grid">${PRODUCTS.map(p=>`
   <div class="prod-card" onclick="toggle('${p.code}')">
    <strong>${p.name}</strong><br>
    ${p.medida}<br>
    ${fmt(p.precioSinIva)} / m²
   </div>
 `).join('')}</div>`;
}

function toggle(code){
 const p=PRODUCTS.find(x=>x.code===code);
 if(quoteItems[code]) delete quoteItems[code];
 else quoteItems[code]={product:p,cajas:1};
 renderQuote();
}

function renderQuote(){
 const w=document.getElementById('quoteTableWrap');
 const items=Object.values(quoteItems);
 if(!items.length){w.innerHTML='';return;}
 let total=0;
 w.innerHTML='<h2>Cotización</h2>' + items.map(i=>{
   const sub=i.product.precioSinIva*i.product.m2Caja*i.cajas;
   total+=sub;
   return `<div>${i.product.name} x ${i.cajas} caja = ${fmt(sub)}</div>`;
 }).join('') + `<hr><strong>Total: ${fmt(total)}</strong><br><br><button onclick="generatePDF()">PDF</button>`;
}

renderCatalog();