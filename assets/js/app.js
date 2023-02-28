let cl=console.log;

const postcontainer=document.getElementById("postcontainer")
const postform=document.getElementById("postform")
const titlecontent=document.getElementById("title")
const contentcontrol=document.getElementById("content")
const updatebtn=document.getElementById("updatebtn")
const submitbtn=document.getElementById("submitbtn")

let baseurl=`http://localhost:3000/posts`

let postarry=[]

//cl(baseurl)

const templating=(arr)=>{
    let result='';
    arr.forEach(age => {
        result+=`
        <div class="card" id=${age.id}>
        <div class="card-header">${age.title}</div>
        <div class="card-body">${age.body}</div>
        <div class="card-footer text-right">
            <button class="btn btn-primary" onclick="oneditebtn(this)">EDITE</button>
            <button class="btn btn-danger" onclick="ondeletebtn(this)">DELETE</button>

        </div>
    </div>

        `
        
    });
    postcontainer.innerHTML=result

}









const makeapicall=(methodname, apicall, body)=>{
    return new Promise((resolve, reject) => {
        let xhr=new XMLHttpRequest()
     
        xhr.open(methodname, apicall)
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.onload=function(){
            if(xhr.status ===200||xhr.status===201){
                resolve(xhr.response)
            }
        }
        xhr.onerror=function(){
            reject("something went wrong "+ xhr.response)
        }
        xhr.send(body)
    })
}
makeapicall("GET", baseurl, null)
.then((res)=>{
   // cl(res)
  postarry= JSON.parse(res)
   templating(JSON.parse(res))
   
   
})
.catch(cl)



const onpostsubmit=(eve)=>{
    eve.preventDefault();
    cl(eve)
    let obj={
        title:titlecontent.value,
        body:contentcontrol.value,
        userId:Math.floor(Math.random() * 11)

    }
    makeapicall("POST", baseurl, JSON.stringify(obj))
    .then(cl)
    .catch(cl)
}




const oneditebtn=(ele)=>{
    cl(ele)
    let editid=ele.closest(".card").id
    cl(editid)
    localStorage.setItem("updateid", editid)
    
    let getobj=postarry.find(obj => obj.id == editid)
    cl(getobj)
   // cl(postarry)
   titlecontent.value=getobj.title;
   contentcontrol.value=getobj.body;
  updatebtn.classList.remove("d-none")
  submitbtn.classList.add("d-none")
}




const onupdatebtn=(eve)=>{
    cl(eve)
    let updatid=localStorage.getItem("updateid")
    let updateurl=`${baseurl}/${updatid}`
    let obj={
        title:titlecontent.value,
        body:contentcontrol.value
    }
    makeapicall("PATCH", updateurl, JSON.stringify(obj))
  .then(cl)
  .catch(cl)
}








const ondeletebtn=(ele=>{
    cl(ele)
    let getid=ele.closest(".card").id
    cl(getid)
    let updateurl=`${baseurl}/${getid}`

    makeapicall("DELETE", updateurl)
    .then(cl)
    .catch(cl)
})




postform.addEventListener("submit", onpostsubmit)
updatebtn.addEventListener("click", onupdatebtn)


