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
const formDataInput = document.querySelectorAll(".formData input")

const modalBody = document.querySelector(".modal-body");

const contenuModalPremier = '<form name="reserve" action="https://pastebin.com/" method="get" onsubmit="return validate();">'
+'<div class="formData"> <label for="first">Prénom</label><br> <input class="text-control" type="text" id="first" name="first" minlength="2"/><br></div>'
+'<div class="formData"><label for="last">Nom</label><br><input class="text-control" type="text" id="last" name="last"/><br></div>'
+'<div class="formData"><label for="email">E-mail</label><br><input class="text-control" type="email" id="email" name="email"/><br></div>'
+'<div class="formData"><label for="birthdate">Date de naissance</label><br><input class="text-control" type="date" id="birthdate" name="birthdate"/><br></div>'
+'<div class="formData"><label for="quantity">À combien de tournois GameOn avez-vous déjà participé ?</label><br><input type="number" class="text-control" id="quantity" name="quantity" min="0" max="99"></div>'
+'<p class="text-label">A quel tournoi souhaitez-vous participer cette année ?</p>'
+'<div class="formData"><input class="checkbox-input" type="radio" id="location1" name="location" value="New York"/>'
+'<label class="checkbox-label" for="location1"><span class="checkbox-icon"></span>New York</label><input class="checkbox-input" type="radio" id="location2" name="location" value="San Francisco"/>'
+'<label class="checkbox-label" for="location2"><span class="checkbox-icon"></span>San Francisco</label><input class="checkbox-input" type="radio" id="location3" name="location" value="Seattle"/>'
+'<label class="checkbox-label" for="location3"><span class="checkbox-icon"></span>Seattle</label><input class="checkbox-input" type="radio" id="location4" name="location" value="Chicago"/>'
+'<label class="checkbox-label" for="location4"><span class="checkbox-icon"></span>Chicago</label><input class="checkbox-input" type="radio" id="location5" name="location" value="Boston"/>'
+'<label class="checkbox-label" for="location5"><span class="checkbox-icon"></span>Boston</label><input class="checkbox-input" type="radio" id="location6" name="location" value="Portland"/>'
+'<label class="checkbox-label" for="location6"><span class="checkbox-icon"></span>Portland</label><!--retour à la ligne pour le span --></br></div>'
+'<!--ajout dun name pour le inputs--><div class="formData"><input class="checkbox-input" type="checkbox" id="checkbox1" name="checkbox"  checked>'
+'<label class="checkbox2-label" for="checkbox1" required><span class="checkbox-icon"></span>J\'ai lu et accepté les conditions d\'utilisation.</label><br>'
+'<input class="checkbox-input" type="checkbox" id="checkbox2" />'
+'<label class="checkbox2-label" for="checkbox2"><span class="checkbox-icon"></span>Je Je souhaite être prévenu des prochains évènements.</label><br></div>'
+'<!--ajout d\'autre class modal-btn-validation et btn-signup des autres btns pour la mise en page et l\'affichage du modale merci--><input class="btn-submit btn-signup modal-btn-validation" type="submit" class="button" value="C\'est parti"/></form>';
console.log(contenuModalPremier)
const contenuModalSeconde = '<div class = "modal-body-merci"><p>Merci pour votre inscription</p></div>'
+'<button class="btn-signup btn-centrer"><a href="index.html">fermer</a></button>';
console.log(contenuModalSeconde)
// ajout de class modal 
class modal {
    constructor(contenu){
        this.contenu = contenu
      }
      get elementHTML (){
         return (modalBody.innerHTML = this.contenu)
      }
      close(blockModal){
        return( blockModal.style.display = "none")
     }
     open(blockModal){
         return(blockModal.style.display = "block")
     }
}
const modalPre = new modal (contenuModalPremier);
const modalSec = new modal(contenuModalSeconde);
modalPre.elementHTML;
modalBtn.forEach((btn) => btn.addEventListener("click", ()=>{
    modalPre.open(modalbg);
}));


// launch modal event
// modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// // launch modal form
// function launchModal() {
//   modalbg.style.display = "block"; 
// }
// function launchModalSecond(){
//     modalbg.style.display = "none";
//     modalbgValidation.style.display ="block";
// }

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
const formData = document.querySelectorAll(".formData");
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

            
            modalPre.close(modalbg)
            modalSec.elementHTML
            modalSec.open(modalbg)
        } 
}





