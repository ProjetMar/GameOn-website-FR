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
function launchModal() {
  modalbg.style.display = "block";
}
function launchModalSecond(){
    modalbg.style.display = "none";
    modalbgValidation.style.display ="block";
}
modalBtnValidation.addEventListener("click", (event)=>{
    event.preventDefault();
    launchModalSecond();
})

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
                               
                               validerBirthdate(event.target.value);
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
                               btnRadio(inputs);
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
                               validerCondition(inputs[0]);
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


function validerBirthdate (birthdate){
   if(birthdate == false || birthdate == ""){
       throw new Error("Vous devez entrer votre date de naissance.");
   }
}
function validerCondition(condition){
   if(condition.checked == false){
       throw new Error("Vous devez vérifier que vous acceptez les termes et conditions.")
   }
}

function btnRadio(inputs){
   // Gestion de l'événement change sur les boutons radios. 
   //let listeBtnRadio = element.getElementsByTagName('span');

   let choixTerminer = false; 
   let i=0;
   console.log(inputs);
   while(i<inputs.length && choixTerminer === false){
       // inputs[i].addEventListener("change", (event) => {
            

       //     choixTerminer = event.checked; 
       //     console.log(choixTerminer);
       //     i++   
      
       //})
       choixTerminer = inputs[i].checked
       console.log(choixTerminer);
       
       i++
   
   }
   if (choixTerminer === false){
       throw new Error("Vous devez choisir une option.");
   }
       
}

function validerQuantity(quantity)   {
   let quantityRegex = new RegExp("[0-99]")
   if(!quantityRegex.test(quantity)){
       throw new Error ("nombre de concours doit etre saisi")
   }
}

// Cette fonction prend un nom en paramètre et valide qu'il est au bon format
function validerNom( nom) {
  if (nom.length < 2) {
      throw new Error("Veuillez entrer 2 caractères ou plus pour le champ du nom." );
  }
   
}
function validerPrenom(prenom) {
   if (prenom.length < 2) {
       throw new Error("Veuillez entrer 2 caractères ou plus pour le champ du prénom." );
   }
    
}
//Cette fonction prend un email en paramètre et valide qu'il est au bon format
function validerEmail(email) {
   let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
   if (!emailRegExp.test(email)) {
       throw new Error("L'email n'est pas valide.");
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



