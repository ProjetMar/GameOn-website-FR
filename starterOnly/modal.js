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
const modalBtn = document.querySelectorAll(".modal-btn");
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

document.querySelector('form').addEventListener("submit", (e)=>{
    e.preventDefault();
    let formulaire = new Formulaire()
    formulaire.gererForm;
    const myFormData = new FormData(e.target);
    const dataArray = [...myFormData];
    console.log(dataArray);
    const data = Object.fromEntries(dataArray);
    console.log(data)
    console.log(JSON.stringify(data));
    formulaire.envoiFormulaire(data);  
})
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
class Formulaire {
    constructor(){
        this.firstName = document.getElementById("first").value
        this.lastName = document.getElementById("last").value
        this.email = document.getElementById("email").value
        this.birthdate = document.getElementById("birthdate").value
        this.quantity = document.getElementById("quantity").value
        this.locations = document.getElementsByName("location")
        this.condition = document.getElementById("checkbox1").value
    }
    valideFirstName(){
        if(this.firstName.length < 2){
            throw new Error("Veuillez entrer 2 caractères ou plus pour le champ du prénom." );
        }
    }
    valideLasteName(){
        if(this.lastName.length < 2){  
            throw new Error("Veuillez entrer 2 caractères ou plus pour le champ du nom." );  
        }
    }
    valideEmail(){
        let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
        if (!emailRegExp.test(this.email)) {
            throw new Error("L'email n'est pas valide.");
        }
    }
    valideBirthdate(){
        let max = "2018-12-30"
        if(this.birthdate == false || this.birthdate == ""){
            throw new Error("Vous devez entrer votre date de naissance.");
        }else if (this.birthdate > max){
            throw new Error ("vous devez avoir au moins 8 ans pour participer")
        }
    }
    valideQuantity(){
        let quantityRegex = new RegExp("[0-99]")
        if(!quantityRegex.test(this.quantity)){
            throw new Error ("nombre de concours doit etre saisi")
        }
    }
    valideLocation(){
        let choixTerminer = false; 
        let i=0;
        while(i<this.locations.length && choixTerminer === false){
            choixTerminer = this.locations[i].checked
            i++
        }
        if (choixTerminer === false){
            throw new Error("Vous devez choisir une option.");
        }
    }
    valideCondition(){
        if(this.condition.checked == false){
            throw new Error("Vous devez vérifier que vous acceptez les termes et conditions.")
        }
    }
    afficherMessageErreur( nameElement, element, message) {
        let spanErreurMessage = document.getElementById("error" + nameElement);
        if (!spanErreurMessage) {
            spanErreurMessage = document.createElement("span")
            spanErreurMessage.id = "error" + nameElement;
            spanErreurMessage.style.color = '#FF4E60' ;
            spanErreurMessage.style.fontSize = '13px';
            element.getElementsByTagName("input")[0].style.border = '2px solid #FF4E60';  
            element.append(spanErreurMessage)
        }
        spanErreurMessage.innerText = message
    }
    get gererForm(){
        let erreurDetecter = false;
        formData.forEach((element)=>{
            let inputs = element.getElementsByTagName("input")
            let nameElement = inputs[0].name;
            try{
                switch(nameElement){
                    case "first":
                        this.valideFirstName()
                    break;
                    case "last":
                        this.valideLasteName()
                    break;
                    case "email":
                        this.valideEmail()
                    break;
                    case "birthdate":
                        this.valideBirthdate()
                    break;
                    case "quantity":
                        this.valideQuantity()
                    break;
                    case "location":
                        this.valideLocation()
                    break;
                    case "checkbox":
                        this.valideCondition()
                    break;
                }
                for(let i=0; i<formData.length ; i++){
                    this.afficherMessageErreur(nameElement, element, "");
                    inputs[0].style.border ='none';
                }      
            }catch(erreur){
                this.afficherMessageErreur( nameElement, element, erreur.message );
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
    envoiFormulaire(data){
        if(this.gererForm == false){
            let details = {
                'api_dev_key': 'c8IZ4vI4bVNSHCYeT_TmKIuypXC0nJBM',
                'api_user_key' : 'b37c8c97c339670c0b5dde8557ce32ef',
                 'api_option' : 'paste',
                 'api_paste_code' : JSON.stringify(data),     
            };
            let formBody = [];
            for (let property in details) {
              let encodedKey = encodeURIComponent(property);
              let encodedValue = encodeURIComponent(details[property]);
              formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            
            // envoyer à l'api
            let options =  fetch("https://pastebin.com/api/api_post.php",{
                mode : 'no-cors',
                method: "POST",
                body: formBody,    
                headers: {
                    "Content-Type" : "application/x-www-form-urlencoded;charset=UTF-8",
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
    }   
}






