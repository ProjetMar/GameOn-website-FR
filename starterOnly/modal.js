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


// ajout de class modal 
// on peut utiliser les colse et open en static car on n'a pas besoin des class creer mar le modal juste ecrir modal.open et modal.close

class Modal {
    constructor(IdElement){
        this.Id = IdElement
    }
      
    get cacheElement (){
        document.getElementById(this.Id).style.display = "none"
    }
    
    get afficheElement(){
        document.getElementById(this.Id).style.display = "block"
    }

    close (blockModal){
        blockModal.style.display = "none"
    }

    open (blockModal){
        blockModal.style.display = "block"
    }
}
const elementModalForm = new Modal ("form");
const elementModalSucces = new Modal("succes");
elementModalForm.afficheElement;
modalBtn.forEach((btn) => btn.addEventListener("click", ()=>{
    elementModalForm.open(modalbg);
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
    
    const myFormData = new FormData(e.target);
    const dataArray = [...myFormData];
    console.log(dataArray);
    const data = Object.fromEntries(dataArray);
    console.log(data)
    console.log(JSON.stringify(data));
    if(gererFormulaire() == false){

        var details = {
            'api_dev_key': 'c8IZ4vI4bVNSHCYeT_TmKIuypXC0nJBM',
            'api_user_key' : 'b37c8c97c339670c0b5dde8557ce32ef',
             'api_option' : 'paste',
             'api_paste_code' : JSON.stringify(data), 
            
        };
        
        var formBody = [];
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        
                 // envoyer à l'api
                    let options =  fetch("https://pastebin.com/api/api_post.php",{
                        mode : 'no-cors',
                        method: "POST",
                        body: formBody,
                        //'api_dev_key' : 'c8IZ4vI4bVNSHCYeT_TmKIuypXC0nJBM',
                        //    'api_user_key' : 'MarProjectApprendre',
                        
                        headers: {
                            "Content-Type" : "application/x-www-form-urlencoded;charset=UTF-8",
                            //"Content-Type" : "application/x-www-form-urlencoded",
                            'Access-Control-Allow-Origin' : '*'
                        }
                    });
                    options.then(async(response)=>{
                        try{
                            const contenue = response;
                            console.log(contenue)
                            //Si la réponse du serveur est OK
                            if (response.ok){
                                
                                console.log("ok");
                            }
                        }
                        catch(e){
                            //On demande l'erreur dans la console
                            console.log(e);
                        }
                    }) 
    }

    
    
    
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


//ajout de l'attribute max aujourd'hui à l'input birthday 
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1; //January is 0!
let yyyy = today.getFullYear();

if (dd < 10) {
   dd = '0' + dd;
}

if (mm < 10) {
   mm = '0' + mm;
} 
    
today = yyyy + '-' + mm + '-' + dd;
document.getElementById("birthdate").setAttribute("max", today);

//Cette fonction permet de récupérer les informations dans le formulaire
// select le formulaire 
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

            
            elementModalForm.close(modalbg)
            elementModalForm.cacheElement
            elementModalSucces.open(modalbg)
            elementModalSucces.afficheElement
            
            
            
        } 
        return(erreurDetecter)
}





