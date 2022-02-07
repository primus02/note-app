// Selectors
let notes= document.querySelectorAll(".note");
let colorArray= ["#EBDB14", "#72C696", "#E57A7A", "#4BABCE"];
let randomNumber= Math.floor(Math.random() * (colorArray.length -1));
let avatars = document.querySelectorAll(".avatar");
let addNoteBtn= document.querySelector(".add-note");
let textField= document.querySelector(".form");
let noteContainer= document.querySelector(".note-container");
let inputTitle= document.querySelector("#title-field");
let inputDesc= document.querySelector("#desc-field");
let saveNoteBtn= document.querySelector(".save");
let eventTitle= document.querySelector(".event-title");
let eventDate= document.querySelector(".event-date");
let eventTime= document.querySelector(".event-time");


// Adding background color to each note dynamically
notes.forEach(note=> {
    note.style.backgroundColor= colorArray[Math.floor(Math.random() * colorArray.length)];
})

// Setting the Avatar with the first letter of the note title
avatars.forEach(avatar=> {
    let avatarLetter= avatar.parentElement.parentElement.children[1].innerHTML[0];

    avatar.innerHTML= avatarLetter;
});


// Event Listeners
// Listener to open up the text fields
addNoteBtn.addEventListener("click", ()=> {
     textField.classList.remove("d-none");
     inputTitle.value= "";
     inputDesc.value= "";
     inputTitle.style.backgroundColor= "#CB8CC1";
     inputDesc.style.backgroundColor= "#CB8CC1";
});

// Listener to save the newly created note
saveNoteBtn.addEventListener("click", addNote);

// Listener to modify, view and delete notes
noteContainer.addEventListener("click", (event)=> {
    let filter= event.target;
    modifyNote(filter);
});



// Functions

// Function to add new note
function addNote(){

    if(inputTitle.value === "" || inputDesc.value === ""){
        alert("Fields cannot be empty!");
        return;
    }
    else{
     let text= `
     <div class="note" style="background-color: ${colorArray[Math.floor(Math.random() * 4)]}">
       <div class="content">
         <h4>Date/Time created- <span class="created-date">${new Date().toLocaleString()}</span></h4>
         <h2>${inputTitle.value}</h2>
         <p class="note-description">
             ${inputDesc.value}
         </p>
         <div class="icons-container">
             <p class="avatar">${inputTitle.value[0]}</p>
             <p class="icons">
                 <span class="edit"><i class="fas fa-edit"></i></span>
                 <span class="delete"><i class="fas fa-trash"></i></span>
             </p>
         </div>
       </div>
      </div>
     `;

     noteContainer.insertAdjacentHTML("afterbegin", text);
     alert("Note added successfully");
     textField.classList.add("d-none");
    }
}

// Function to modify, view and delete notes
function modifyNote(filter){
    if(filter.classList.contains("fa-trash")){
        alert("Note deleted successfully");
    filter.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
    }

    if(filter.classList.contains("fa-edit")){
        textField.classList.remove("d-none");
        addNoteBtn.classList.remove("d-none");
        saveNoteBtn.classList.remove("d-none");
        inputTitle.removeAttribute("disabled");
        inputDesc.removeAttribute("disabled");
        inputTitle.value = filter.parentElement.parentElement.parentElement.parentElement.children[1].innerHTML;
        inputDesc.value= filter.parentElement.parentElement.parentElement.parentElement.children[2].innerHTML;
        filter.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
    }

    if(filter.classList.contains("note")){
        textField.classList.remove("d-none");
        addNoteBtn.classList.add("d-none");
        saveNoteBtn.classList.add("d-none");
        inputTitle.style.backgroundColor= filter.style.backgroundColor;
        inputDesc.style.backgroundColor= filter.style.backgroundColor;
        inputTitle.value= filter.children[0].children[1].innerHTML;
        inputDesc.value= filter.children[0].children[2].innerHTML;
        inputTitle.setAttribute("disabled", "true");
        inputDesc.setAttribute("disabled", "true");
        eventTitle.innerHTML= filter.children[0].children[1].innerHTML;
        eventDate.innerHTML= filter.children[0].children[0].children[0].innerHTML;
    }
}
