let xhr = new XMLHttpRequest();
let div_verbes = document.getElementById("liste_verbes");
let div_input = document.getElementById("input");

// la ligne suivante est à décommenter après écriture de creer_interface
document.body.onload = creer_interface;

function creer_interface() {
  // L'input de type text
  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.id = 'recherche';
  textInput.placeholder = "Entrez une séquence";
  textInput.style.width = "100%";

  // Recherche dans la BDD à partir de ce que l'on a écrit
  textInput.addEventListener("input", function () {
    charger_verbes(textInput.value, "seq");
  })
  div_input.appendChild(textInput);


  // Le clavier virtuel
  const alphabet = 'abcdefghijklmnopqrstuvwxyzœ'.split('');
  for (let i = 0; i < alphabet.length; i++) {
    let buttonLetter = document.createElement("input");
    buttonLetter.type = "button";
    buttonLetter.value = alphabet[i];
    buttonLetter.style.width = "20%";

    buttonLetter.addEventListener('click', () => {
      charger_verbes(alphabet[i], "init");
    });
    div_input.appendChild(buttonLetter);
  }

  // Le bouton pour effacer
  let buttonDelete = document.createElement("input");
  buttonDelete.type = "button";
  buttonDelete.value = "Effacer la liste";
  buttonDelete.style.width = "100%";

  buttonDelete.addEventListener("click", function () {
    // Vide le div des verbes
    div_verbes.innerHTML = '';
    // Efface le champ de recherche
    textInput.value = '';
  });
  div_input.appendChild(buttonDelete);
}

function callback_basique() {
  let xhrJSON = JSON.parse(xhr.responseText);
  console.log(xhrJSON);
}

function callback() {
  let xhrJSON = JSON.parse(xhr.responseText);
  div_verbes.innerHTML = '';
  for (let index = 0; index < xhrJSON.length; index++) {
    let result = document.createElement("p");
    result.innerHTML = xhrJSON[index].libelle;
    div_verbes.appendChild(result);
  }
}

function charger_verbes(lettre, type) {
  let url = "./php/recherche.php";
  xhr.open("POST", url, true);
  //Envoie les informations du header adaptées avec la requête
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.addEventListener("load", callback);
  xhr.send("lettre=" + encodeURI(lettre) + "&type=" + type);
}
