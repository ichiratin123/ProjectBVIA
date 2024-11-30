document.getElementById("shopIn").addEventListener("click", ()=> {
    var formCountry = document.querySelector(".form-country");
    formCountry.style.display = "block";
});

document.getElementById("closeForm").addEventListener("click", ()=> {
    document.querySelector(".form-country").style.display = "none";
});


document.addEventListener("DOMContentLoaded",  ()=> {
    const countrySelect = document.getElementById("countrySelect");
    const currentCountryDisplay = document.querySelector(".currentCountry");
    const localTexts = document.querySelectorAll(".localText");
    const saveButton = document.querySelector(".save-button");

    const translations = {
        us: {
            currentCountry: "US",
            labelLocation: "Please select your Location",
            buttonContinue: "Continue Shopping",
            note: "Please be advised that changing your location while shopping will remove all contents from your Shopping Bag.",
        },
        uk: {
            currentCountry: "UK",
            labelLocation: "Please select your Location",
            buttonContinue: "Continue Shopping",
            note: "Please be advised that changing your location while shopping will remove all contents from your Shopping Bag.",
        },
        ca: {
            currentCountry: "CA",
            labelLocation: "Please select your Location",
            buttonContinue: "Continue Shopping",
            note: "Please be advised that changing your location while shopping will remove all contents from your Shopping Bag.",
        },
        vn: {
            currentCountry: "VN",
            labelLocation: "Vui lòng chọn vị trí của bạn",
            buttonContinue: "Tiếp tục mua sắm",
            note: "Lưu ý rằng thay đổi vị trí của bạn sẽ xóa tất cả nội dung trong giỏ hàng của bạn.",
        },
        jp: {
            currentCountry: "JP",
            labelLocation: "Please select your Location",
            buttonContinue: "Continue Shopping",
            note: "Please be advised that changing your location while shopping will remove all contents from your Shopping Bag.",
        },
        kr: {
            currentCountry: "KR",
            labelLocation: "Please select your Location",
            buttonContinue: "Continue Shopping",
            note: "Please be advised that changing your location while shopping will remove all contents from your Shopping Bag.",
        },
        de: {
            currentCountry: "DE",
            labelLocation: "Bitte wählen Sie Ihren Standort",
            buttonContinue: "Weiter einkaufen",
            note: "Bitte beachten Sie, dass ein Standortwechsel während des Einkaufs alle Inhalte Ihres Warenkorbs entfernt.",
        },
        fr: {
            currentCountry: "FR",
            labelLocation: "Veuillez sélectionner votre emplacement",
            buttonContinue: "Continuer vos achats",
            note: "Veuillez noter que changer de localisation supprimera tout le contenu de votre panier.",
        },
        es: {
            currentCountry: "ES",
            labelLocation: "Seleccione su ubicación",
            buttonContinue: "Continuar comprando",
            note: "Tenga en cuenta que cambiar su ubicación eliminará todo el contenido de su bolsa de compras.",
        },
        it: {
            currentCountry: "IT",
            labelLocation: "Si prega di selezionare la propria posizione",
            buttonContinue: "Continua a fare acquisti",
            note: "Si prega di notare che cambiare posizione rimuoverà tutti i contenuti dal carrello.",
        },
        cn: {
            currentCountry: "CN",
            labelLocation: "请选择您的位置",
            buttonContinue: "继续购物",
            note: "请注意，更改位置会清空购物袋中的所有内容。",
        },
        in: {
            currentCountry: "IN",
            labelLocation: "Please select your Location",
            buttonContinue: "Continue Shopping",
            note: "Please be advised that changing your location while shopping will remove all contents from your Shopping Bag.",
        },
        au: {
            currentCountry: "AU",
            labelLocation: "Please select your Location",
            buttonContinue: "Continue Shopping",
            note: "Please be advised that changing your location while shopping will remove all contents from your Shopping Bag.",
        },
        br: {
            currentCountry: "BR",
            labelLocation: "Por favor, selecione sua localização",
            buttonContinue: "Continuar comprando",
            note: "Observe que mudar sua localização removerá todo o conteúdo da sua sacola de compras.",
        },
        za: {
            currentCountry: "ZA",
            labelLocation: "Please select your Location",
            buttonContinue: "Continue Shopping",
            note: "Please be advised that changing your location while shopping will remove all contents from your Shopping Bag.",
        },
        mx: {
            currentCountry: "MX",
            labelLocation: "Seleccione su ubicación",
            buttonContinue: "Continuar comprando",
            note: "Tenga en cuenta que cambiar su ubicación eliminará todo el contenido de su bolsa de compras.",
        },
    };
    
    function applyTranslations(countryCode) {
        const translation = translations[countryCode];
        if (translation) {
            currentCountryDisplay.textContent = translation.currentCountry;
            localTexts.forEach((element) => {
                if (element.tagName === "LABEL") {
                    element.textContent = translation.labelLocation;
                } else if (element.tagName === "BUTTON") {
                    element.textContent = translation.buttonContinue;
                } else if (element.classList.contains("note")) {
                    element.textContent = translation.note;
                }
            });
        }
    }

    function loadSavedSettings() {
        const savedCountry = localStorage.getItem("selectedCountry");
        if (savedCountry && translations[savedCountry]) {
            applyTranslations(savedCountry);
            countrySelect.value = savedCountry;
        }
    }

    saveButton.addEventListener("click", (e)=> {
        e.preventDefault();
        const selectedCountry = countrySelect.value;
        if (selectedCountry === "anou") {
            alert("Please select your shipping country");
            return;
        }
        if (translations[selectedCountry]) {
            localStorage.setItem("selectedCountry", selectedCountry);
            applyTranslations(selectedCountry);
            document.querySelector(".form-country").classList.remove("active");
        }
    });

    loadSavedSettings();
});