function getAndUpdate(){
    title= document.getElementById("list-title").value
    document.getElementById("list-title").value=""
    desc= document.getElementById("description").value
    document.getElementById("description").value= ""

    if(localStorage.getItem('itemsJson') == null){
        itemsarr=[];
        itemsarr.push([title, desc])
        localStorage.setItem('itemsJson', JSON.stringify(itemsarr))
    }
    else{
        itemarrayStr= localStorage.getItem('itemsJson')
        itemsarr= JSON.parse(itemarrayStr)
        itemsarr.push([title, desc])
        localStorage.setItem("itemsJson", JSON.stringify(itemsarr))
    }
    update();
}


function update(){
    if(localStorage.getItem('itemsJson') == null){
        itemsarr=[];
        localStorage.setItem('itemsJson', JSON.stringify(itemsarr))
    }
    else{
        itemarrayStr= localStorage.getItem('itemsJson')
        itemsarr= JSON.parse(itemarrayStr)
    }
    //populate the table
    tablebody= document.getElementById("tablebody")
    let str=""
    itemsarr.forEach((element, index) => {
        str+= `
        <tr>
        <th scope="row">${index+1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete</button></td>
        </tr>
        `
    });
    tablebody.innerHTML= str;
}

add = document.getElementById("add");
add.addEventListener("click", getAndUpdate);
update();
function deleted(itemindex){
    itemarrayStr= localStorage.getItem('itemsJson')
    itemsarr= JSON.parse(itemarrayStr)
    itemsarr.splice(itemindex,1)
    localStorage.setItem("itemsJson", JSON.stringify(itemsarr))
    update();
}
function clearStorage(){
    if (confirm("Do you really want to clear the entire list?")){
    localStorage.clear();
    update();
    }
}
