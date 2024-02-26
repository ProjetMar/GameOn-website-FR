function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalbgValidation = document.querySelector(".bground-validation")
const modalBtn = document.querySelectorAll(".modal-btn");
const modalBtnValidation = document.querySelector(".modal-btn-validation")
const formData = document.querySelectorAll(".formData");
const formDataInput = document.querySelectorAll(".formData input")

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal(data) {
  modalbg.style.display = "block";
  
    console.log(data)
  
}
function launchModalSecond(){
    modalbg.style.display = "none";
    modalbgValidation.style.display ="block";
}

document.querySelector('form').addEventListener("submit", (e)=>{
    e.preventDefault();
    // let form = e.currentTarget
    // const data = new FormData(form);
    // console.log(data);
    gererFormulaire();
})

function validerPrenom(prenom) {
   if (prenom.length < 2) {
       throw new Error("Veuillez entrer 2 caractères ou plus pour le champ du prénom." );
   }
}

// Cette fonction prend un nom en paramètre et valide qu'il est au bon format
function validerNom( nom) {
    if (nom.length < 2) {
        throw new Error("Veuillez entrer 2 caractères ou plus pour le champ du nom." );
    }
}

//Cette fonction prend un email en paramètre et valide qu'il est au bon format
function validerEmail(email) {
   let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
   if (!emailRegExp.test(email)) {
       throw new Error("L'email n'est pas valide.");
   }
}

function validerDateDeNaissance (birthdate){
    let max = "2018-12-30"
    if(birthdate == false || birthdate == ""){
        throw new Error("Vous devez entrer votre date de naissance.");
    }else if (birthdate > max){
        throw new Error ("vous devez avoir au moins 8 ans pour participer")
    }
}

function validerQuantity(quantity)   {
    let quantityRegex = new RegExp("[0-99]")
    if(!quantityRegex.test(quantity)){
        throw new Error ("nombre de concours doit etre saisi")
    }
}

function validerChoixParticipation(inputs){
    // Gestion de l'événement change sur les boutons radios. 
 
    let choixTerminer = false; 
    let i=0;
    while(i<inputs.length && choixTerminer === false){
        choixTerminer = inputs[i].checked
        i++
    }
 
    if (choixTerminer === false){
        throw new Error("Vous devez choisir une option.");
    }
 }

 function validerConditionsUtilisation(condition){
    if(condition.checked == false){
        throw new Error("Vous devez vérifier que vous acceptez les termes et conditions.")
    }
 }


//Cette fonction affiche le message d'erreur passé en paramètre. 
//Si le span existe déjà, alors il est réutilisé pour ne pas multiplier
 //les messages d'erreurs. 
function afficherMessageErreur( nameElement, element, message) {
   console.log(element);
   console.log(nameElement);
   let spanErreurMessage = document.getElementById("error" + nameElement);

   if (!spanErreurMessage) {
       
      
       // let popup = document.querySelector(".modal-body")
       spanErreurMessage = document.createElement("span")
       spanErreurMessage.id = "error" + nameElement;
       spanErreurMessage.style.color = '#FF4E60' ;
       spanErreurMessage.style.fontSize = '13px';
       element.getElementsByTagName("input")[0].style.border = '2px solid #FF4E60';
        
       
       element.append(spanErreurMessage)
   }
   
   spanErreurMessage.innerText = message
}

//Cette fonction permet de récupérer les informations dans le formulaire
function gererFormulaire(){
    let erreurDetecter = false;
    
      formData.forEach((element)=>{
            let inputs= element.getElementsByTagName("input");
            let nameElement = inputs[0].name;
            console.log(nameElement);
            let content = inputs[0].value;
            
            try{
                switch(nameElement){
                    case 'first':
                        validerPrenom(content);
                        
                        
                    break;
                    case 'last':
                        validerNom(content);
                        
                        
                    break;
                    case 'email':
                        validerEmail(content);
                        
                    break;

                    case 'birthdate':
                        validerDateDeNaissance(content);
                    break;

                    case 'location':
                        validerChoixParticipation(inputs);
                    break;
                    case 'quantity':
                        validerQuantity(content);
                    break;

                    case 'checkbox':
                        validerConditionsUtilisation(inputs[0]);
                    break;
                }
                
                for(i=0; i<formData.length ; i++){
                    afficherMessageErreur(nameElement, element, "");
                    inputs[0].style.border ='none';
                }
                
            }catch(erreur){
                afficherMessageErreur( nameElement, element, erreur.message );
                erreurDetecter = true;
                 
            }
            
           
        })

        
        if (erreurDetecter === false){

             launchModalSecond();
        } 
}



