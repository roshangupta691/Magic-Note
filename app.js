//if user add a note, add it to local storage.
shownotes();

let addbtn = document.getElementById('addbtn');
addbtn.addEventListener("click",function(e){
    let addtxt=document.getElementById('addtxt');
    let addTitle=document.getElementById('addTitle');
    let notes=localStorage.getItem("notes");
    if(notes==null)
    {
        notesObj=[];
    }
    else{
        notesObj= JSON.parse(notes);
    }
    let myObj={
        title:addTitle.value,
        text:addtxt.value

    }
    notesObj.push(myObj);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    addTitle.value="";
    addtxt.value="";
    shownotes();
});

//function to show notes..
function shownotes() {
    let notes = localStorage.getItem("notes");
    if(notes == null)
    {
        notesObj=[];
    }
    else
    {
        notesObj=JSON.parse(notes);
    }
    let html="";
    notesObj.forEach(function(element,index){
        html+= `
        <div class="notecard mx-2 my-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.text}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Node</button>
                </div>
            </div>
        `;
    });
    let notesEln=document.getElementById('notes');
    if(notesObj.length != 0){
        notesEln.innerHTML=html;
    }
    else{
        notesEln.innerHTML=`Nothing to show! Use "Add a Note" Section above to add Notes.`;
    }
}

//function to delete node
function deleteNote(index){
    let notes = localStorage.getItem("notes");
    if(notes == null)
    {
        notesObj=[];
    }
    else
    {
        notesObj=JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    shownotes();
}

let search = document.getElementById('searchtxt');
search.addEventListener("input",function()
{
    let inputVal = search.value;
    let noteCards=document.getElementsByClassName('notecard');

    Array.from(noteCards).forEach(function(element){
        let cardTxt=element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal))
        {
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
    });
});