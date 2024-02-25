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
// modalBtnValidation.addEventListener("click", (event)=>{
//      event.preventDefault();

//     gererFormulaire();

// })

//===========================================
// ajouter des messages d'erreur quand l'utilisateur à fin de saisir le champ 
//===========================================
function gererFormulaireAuSaisie(){
   
    
    formData.forEach((element)=>{
            let inputs= element.getElementsByTagName("input");
            let nameElement = inputs[0].name;
           console.log(nameElement);
           let content = inputs[0].value;
           
           
               switch(nameElement){
                   case 'first':
                    document.getElementById(nameElement).addEventListener("change", (event)=>{
                            event.preventDefault();
                           
                           try{
                               validerPrenom(event.target.value);
                               console.log(event.target.value);
                               afficherMessageErreur(nameElement, element, "");
                            
                           }catch(erreur){
                               afficherMessageErreur( nameElement, element, erreur.message );
                              
                                
                           }
                       })
                       
                       
                       
                    break;
                    case 'last':
                      
                        document.getElementById(nameElement).addEventListener("change", (event)=>{
                            event.preventDefault();
                            
                            try{
                               validerNom(event.target.value);
                               afficherMessageErreur(nameElement, element, "");
                              
                           }catch(erreur){
                               afficherMessageErreur( nameElement, element, erreur.message );
                             
                                
                           }
                       })
                       
                    break;
                    case 'email':
                        document.getElementById(nameElement).addEventListener("change", (event)=>{
                           event.preventDefault();
                            
                            try{
                               validerEmail(event.target.value);
                               afficherMessageErreur(nameElement, element, "");
                               
                           }catch(erreur){
                               afficherMessageErreur( nameElement, element, erreur.message );
                              
                                
                           }
                        })
                       
                   break;
                   case 'birthdate':
                        document.getElementById(nameElement).addEventListener("change", (event)=>{
                           event.preventDefault();
                           console.log(inputs[0]);
                            
                            try{
                               
                               validerDateDeNaissance(event.target.value);
                               afficherMessageErreur(nameElement, element, "");
                               
                           }catch(erreur){
                               afficherMessageErreur( nameElement, element, erreur.message );
                              
                                
                           }
                        })
                       
                   break;
                   
                   case 'location':
                        document.getElementsByName(nameElement).forEach((btn)=>btn.addEventListener("change", (event)=>{
                            event.preventDefault();
                            
                            try{
                               validerChoixParticipation(inputs);
                               afficherMessageErreur(nameElement, element, "");
                               
                           }catch(erreur){
                               afficherMessageErreur( nameElement, element, erreur.message );
                              
                                
                           }
                        }))
                    break;
                   case 'quantity':
                       
                       document.getElementById(nameElement).addEventListener("change", (event)=>{
                           event.preventDefault();
                           
                           try{
                               validerQuantity(event.target.value);
                               afficherMessageErreur(nameElement, element, "");
                               
                           }catch(erreur){
                               afficherMessageErreur( nameElement, element, erreur.message );
                             
                           }
                               
                        })
                   break;
                   case 'checkbox':
                       
                       document.getElementsByName(nameElement)[0].addEventListener("change", (event)=>{
                           event.preventDefault();
                           
                           try{
                               validerConditionsUtilisation(inputs[0]);
                               afficherMessageErreur(nameElement, element, "");
                               
                           }catch(erreur){
                               afficherMessageErreur( nameElement, element, erreur.message );
                             
                           }
                               
                        })
                   break;
               }                         
           })

}

gererFormulaireAuSaisie();


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
    if(birthdate == false || birthdate == ""){
        throw new Error("Vous devez entrer votre date de naissance.");
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
       
       element.append(spanErreurMessage)
   }
   
   spanErreurMessage.innerText = message
}


// let inputForm = document.querySelectorAll(".formData input");
// inputForm.forEach((btn)=>btn.addEventListener("change", gererFormulaire()));

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
                // console.log(content);
                // if (nameElement === "first"){
                //     validerPrenom(content);
                // }else if (nameElement == "last"){
                //     validerNom(content);
                // }
                for(i=0; i<formData.length ; i++){
                    afficherMessageErreur(nameElement, element, "");
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



