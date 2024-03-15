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
const formDataInput = document.querySelectorAll(".formData input");
const modalBody = document.querySelector(".modal-body");
const boutonsClose = document.querySelectorAll(".btn-close");

//Ajout d'un écouteur d'événement pour fermer la modale lorsque les boutons x ou fermer sont cliqué
boutonsClose.forEach((btn) => btn.addEventListener("click", ()=>{
    modal.close();
    modal.displayPage("form");
}));

// ajout d'un classe modal qui permet d'afficher soit le modal de formulaire soit le modal du message de remerciement
class Modal {
    constructor(modalParentDiv, elementsClassName){
        this.listPages = document.getElementsByClassName(elementsClassName);
		this.modalParentDiv = modalParentDiv;
    }
	// cacher tous les pages modal sauf la page avec l'id = Id passer en parametre 
    displayPage(Id){
		for(let i=0; i< this.listPages.length; i++){
			this.listPages[i].style.display = "none";
		}
		document.getElementById(Id).style.display = "block";
    }
    //fermer la modal
    close (){
        this.modalParentDiv.style.display = "none";
    }
    //ouvrir la modal
    open (){
        this.modalParentDiv.style.display = "block";
    }
}
// Création d'une instance de la classe Modal
const modal = new Modal (modalbg, "element-modal");

// Affichage de la page "form" par défaut
modal.displayPage("form");

// Ajout d'un écouteur d'événement pour ouvrir la modale lorsque le bouton est cliqué
modalBtn.forEach((btn) => btn.addEventListener("click", ()=>{
    modal.open();
}));

document.querySelector('form').addEventListener("submit", (e)=>{
    e.preventDefault();
    let formulaire = new Formulaire();
    let errorDetected = formulaire.gererForm;
    if (errorDetected === false){
        const myFormData = new FormData(e.target);
        const dataArray = [...myFormData];
        const data = Object.fromEntries(dataArray);
        document.querySelector("form").reset();
        formulaire.envoiFormulaire(data);
    } 
})
//ajout de l'attribute max à l'input birthday 
function formatCurrentDate(){
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
    let maxDate = yyyy-13 + '-' + mm + '-' + dd;

    return maxDate;
}

document.getElementById("birthdate").setAttribute("max", formatCurrentDate());

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
        this.condition = document.getElementById("checkbox1")
        this.tabFonction = {
            "first" : this.validateFirstName,
            "last" : this.validateLasteName,
            "email" : this.validateEmail,
            "birthdate" : this.validateBirthdate,
            "quantity" : this.validateQuantity,
            "location" : this.validateLocation,
            "checkbox" : this.validateCondition
        }
    }
    validateFirstName(self){
        if(self.firstName.length < 2){
            throw new Error("Veuillez entrer 2 caractères ou plus pour le champ du prénom." );
        }
    }
    validateLasteName(self){
        if(self.lastName.length < 2){  
            throw new Error("Veuillez entrer 2 caractères ou plus pour le champ du nom." );  
        }
    }
    validateEmail(self){
        let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
        if (!emailRegExp.test(self.email)) {
            throw new Error("L'email n'est pas valide.");
        }
    }
    validateBirthdate(self){
        //IB : ajout d'un min également
        let max = formatCurrentDate();
        if(self.birthdate == false || self.birthdate == ""){
            throw new Error("Vous devez entrer votre date de naissance.");
        }else if (self.birthdate > max){
            throw new Error ("vous devez avoir au moins 13 ans pour participer")
        }
    }
    validateQuantity(self){
        let quantityRegex = new RegExp("[0-99]")
        if(!quantityRegex.test(self.quantity)){
            throw new Error ("nombre de concours doit etre saisi")
        }
    }
    validateLocation(self){
        let choixTerminer = false; 
        let i=0;
        while(i<self.locations.length && choixTerminer === false){
            choixTerminer = self.locations[i].checked
            i++
        }
        if (choixTerminer === false){
            throw new Error("Vous devez choisir une option.");
        }
    }
    validateCondition(self){
        if(self.condition.checked == false){
            throw new Error("Vous devez vérifier que vous acceptez les termes et conditions.")
        }
    }
    displayMessageError( nameElement, element, message) {
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
        let detectedError = false;
        formData.forEach((element)=>{
            let inputs = element.getElementsByTagName("input");
            let nameElement = inputs[0].name;
            try{
                this.tabFonction[nameElement](this);
                this.displayMessageError(nameElement, element, "");
                inputs[0].style.border ='none'; 
                   
            }catch(erreur){
                this.displayMessageError( nameElement, element, erreur.message );
                detectedError = true;
            }
        })
        if (detectedError === false){   
            modal.displayPage("succes")   
        } 
        return(detectedError)
    }
    envoiFormulaire(data){
        
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






