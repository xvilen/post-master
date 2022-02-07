console.log('heyy');
// initialize nmber of parameter 
 let paramcount = 0
 // utility function
 //utility function to gt element to dom
 function getelementfromstr(str) {
     let div = document.createElement('div')
     div.innerHTML = str;
     return div.firstElementChild;
 }
// hide the parameter box intially
let parameterbox = document.getElementById('parameterbox')
parameterbox.style.display = 'none'

// if the user click on param hide json box

let paramsradio = document.getElementById('param')
paramsradio.addEventListener('click',()=>{
    document.getElementById('reqjsonbox').style.display = 'none'
    parameterbox.style.display = 'block'
})
// if the user click on json hide param box
let jsonradio = document.getElementById('json')
jsonradio.addEventListener('click',()=>{
    parameterbox.style.display = 'none'
    document.getElementById('reqjsonbox').style.display = 'block'
})


// if user click on + button add more paramreter

let addparam = document.getElementById('addparam')
addparam.addEventListener('click',()=>{
    let param=document.getElementById('paramlist')
    let str=` <div class="form-row my-2">
    <label for="url" class="col-sm-2 col-form-label">Parameter ${paramcount+2}</label>
    <div class="col-md-4">
        <input type="txet" class="form-control" id="paramkey${paramcount+2}" placeholder="Enter Parameter ${paramcount+2} Key " />
    </div>

    <div class="col-md-4">
        <input type="txet" class="form-control" id="paramvalue${paramcount+2}" placeholder="Enter Parameter  ${paramcount+2} Value" />
    </div>
    <button class="btn btn-primary removeprm">-</button>
</div>`
//convert the element str into domnote
let paramelement =getelementfromstr(str)
param.appendChild(paramelement)
//adding event listner to removing
let deleteprm = document.getElementsByClassName('removeprm')
for (item of deleteprm){
    item.addEventListener('click',(e)=>{
        e.target.parentElement.remove()

    })
}

paramcount++;

})



let submit = document.getElementById('submit')
submit.addEventListener('click',()=>{
    // ??show please wait in the respose box 
    // document.getElementById('rspnsjsontext').value="pelease wait fetching response......"
    document.getElementById('responsePrism').innerHTML="pelease wait fetching response......"

    //etch all the input
    let url = document.getElementById('urlfield').value
    let requesttype = document.querySelector("input[name='requestType']:checked").value
    let contenttype = document.querySelector("input[name='contentType']:checked").value
   
    if (contenttype == 'param') {
        data = {};
        for (let i = 0; i < paramcount + 1; i++) {
            if (document.getElementById('paramkey' + (i + 1)) != undefined) {
                let key = document.getElementById('paramkey' + (i + 1)).value;
                console.log(key);
                
                let value = document.getElementById('paramvalue' + (i + 1)).value;
                console.log(value);
                
                data[key] = value; 
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('reqjsontext').value;
    }
     // for debug 
     console.log(url,requesttype,contenttype,data);
     console.log(data);

     if (requesttype=='GET'){
         fetch(url,{
             method:'GET'
         })
         .then(response=> response.text())
         .then((text)=>{
            // document.getElementById('rspnsjsontext').value= text;
            document.getElementById('responsePrism').innerHTML= text;
            Prism.highlightAll();
         })
     }
     else{
        fetch(url,{
            method:'POST',
            body:data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        })
        .then(response=> response.text())
        .then((text)=>{
        //    document.getElementById('rspnsjsontext').value= text;
           document.getElementById('responsePrism').innerHTML= text;
           Prism.highlightAll();
        })
     }
})