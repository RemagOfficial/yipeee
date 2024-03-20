
(function () {
    console.debug("Cookie clicker init");
    let AutoClickerCost = 20;
    let AutoClickerClickerCost = 20;
    let PriceDecreaseCost = 200;
    let ProductionIncreaseCost = 200;
    let cookies = 1000000;


    let shopShown = false;
    let upgradeShown = false;
    let slideMenuShown = false;
    let shopMenuShown = false;

    let AutoclickersProductionRate = 1;

    let AutoClickers = 0;
    let AutoClickerClickers = 0;
    let CostReductionUpgradesAutoclicker = 0;
    let CostReductionUpgradesAutoclickerClicker = 0;

    let formattedCookies = 0;
    let formattedAutoClickers = 0;
    let formattedAutoClickerClickers = 0;

    const fileInput = document.getElementById('saveImport');

    var hook = true;
    function onBeforeUnload(e) {
        if (hook) {
            e.preventDefault();
            e.returnValue = 'Warning: This game doesn\'t save automatically, use the button';
            return;
        }
    
        delete e['returnValue'];
    }
    
    window.addEventListener('beforeunload', onBeforeUnload);

    document.addEventListener('DOMContentLoaded', function() {

        console.log("Hey, what are you doing here?")
        console.log("Why'd you open this?")

        fileInput.addEventListener('change', function(event) {
            const file = event.target.files[0];

            if (file) {
                const reader = new FileReader();

                reader.onload = function(e) {
                    const contents = e.target.result;

                    try {
                        const jsonData = JSON.parse(contents); // Parse JSON data
                        // Now you can access the values from jsonData
                        console.log('Parsed JSON data:', jsonData);

                        const cookiesFromJSON = jsonData.Cookies;
                        const AutoClickersFromJSON = jsonData.AutoClickers;
                        const AutoClickerClickersFromJSON = jsonData.AutoClickerClickers;
                        const CostReductionUpgradesAutoclickerFromJSON = jsonData.CostReductionUpgradesAutoclicker;
                        const CostReductionUpgradesAutoclickerClickerFromJSON = jsonData.CostReductionUpgradesAutoclickerClicker;
                        const AutoClickerCostFromJSON = jsonData.AutoClickerCost;
                        const AutoClickerClickerCostFromJSON = jsonData.AutoClickerClickerCost;
                        const PriceDecreaseCostFromJSON = jsonData.PriceDecreaseCost;
                        const ProductionIncreaseCostFromJSON = jsonData.ProductionIncreaseCost;
                        const AutoclickersProductionRateFromJSON = jsonData.AutoclickersProductionRate;

                        cookies = cookiesFromJSON;
                        AutoClickers = AutoClickersFromJSON;
                        AutoClickerClickers = AutoClickerClickersFromJSON;
                        CostReductionUpgradesAutoclicker = CostReductionUpgradesAutoclickerFromJSON;
                        CostReductionUpgradesAutoclickerClicker = CostReductionUpgradesAutoclickerClickerFromJSON;
                        AutoClickerCost = AutoClickerCostFromJSON;
                        AutoClickerClickerCost = AutoClickerClickerCostFromJSON;
                        PriceDecreaseCost = PriceDecreaseCostFromJSON;
                        ProductionIncreaseCost = ProductionIncreaseCostFromJSON;
                        AutoclickersProductionRate = AutoclickersProductionRateFromJSON;
                    } catch (error) {
                        console.error('Error parsing JSON:', error);
                    }
                };

                reader.readAsText(file); // Read the file as text
            }
        }) 

    })

    function receiveCookie(amount) {
        cookies += amount;
        document.getElementById("clicks").style.display = "block";
        setTimeout(() => {
            document.getElementById("clicks").style.display = "none";
          }  , 100);
    }

    function receiveCookieAuto(amount) {
        cookies += amount;
        let formattedCookies = cookies.toLocaleString()
        document.getElementById("cookieDisplay").innerHTML = formattedCookies;
        document.title = "this mf has " + formattedCookies + " cookies";
    }

    function showToast(text, colour, borderColor) {
        let toaster = document.getElementById("toasts");
        toaster.innerHTML = text;
        toaster.style.backgroundColor = colour;
        toaster.style.borderColor = borderColor;
        toaster.className = "show";

        setTimeout(function () {
            toaster.className = toaster.className.replace("show", "");
        }, 3000)
    }

    function purchaseAutoClicker() {
        if (cookies >= AutoClickerCost) {
            cookies = cookies - AutoClickerCost;
            AutoClickers++;
            AutoClickerCost = Math.round((Math.round(AutoClickerCost) + (Math.round(AutoClickerCost) * 0.20)));
            showToast("Autoclicker Purchased", "#333", "#000")
        } else {
            showToast("You cannot afford an autoclicker!", "rgb(121, 28, 28)")
        }
    }

    function purchaseAutoClickerClicker() {
        if (AutoClickers >= AutoClickerClickerCost) {
            AutoClickers = AutoClickers - AutoClickerClickerCost;
            AutoClickerClickers++;
            AutoClickerClickerCost = Math.round((Math.round(AutoClickerClickerCost) + (Math.round(AutoClickerClickerCost) * 0.20)));
            showToast("Autoclicker Clicker Purchased", "#333", "#000")
        } else {
            showToast("You cannot afford an autoclicker clicker!", "rgb(121, 28, 28)")
        }
    }

    function upgradeLowerPricesAutoclickers() {
        if (cookies >= PriceDecreaseCost) {
            cookies = cookies - PriceDecreaseCost;
            AutoClickerCost = (AutoClickerCost - (AutoClickerCost * 0.05)).toFixed(2);
            CostReductionUpgradesAutoclicker++;
            PriceDecreaseCost = Math.round((Math.round(PriceDecreaseCost) + (Math.round(PriceDecreaseCost) * 0.20)));
            showToast("Decreased autoclicker price by 5%", "#333", "#000")
        } else {
            showToast("You cannot afford this upgrade!", "rgb(121, 28, 28)")
        }
    }

    function upgradeLowerPricesAutoclickerClickers() {
        if (cookies >= PriceDecreaseCost) {
            cookies = cookies - PriceDecreaseCost;
            AutoClickerClickerCost = (AutoClickerClickerCost - (AutoClickerClickerCost * 0.05)).toFixed(2);
            CostReductionUpgradesAutoclickerClicker++;
            PriceDecreaseCost = Math.round((Math.round(PriceDecreaseCost) + (Math.round(PriceDecreaseCost) * 0.20)));
            showToast("Decreased autoclicker clicker price by 5%", "#333", "#000")
        } else {
            showToast("You cannot afford this upgrade!", "rgb(121, 28, 28)")
        }
    }

    function upgradeMoreCookiesPerClick() {
        if (cookies >= ProductionIncreaseCost) {
            cookies = cookies - ProductionIncreaseCost;
            AutoclickersProductionRate++;
            ProductionIncreaseCost = Math.round((Math.round(ProductionIncreaseCost) + (Math.round(ProductionIncreaseCost) * 0.20)));
            showToast("Increased autoclicker production by 4/s", "#333", "#000")
        } else {
            showToast("You cannot afford this upgrade!", "rgb(121, 28, 28)")
        }
    }

    function openSlideMenu() {
        if (slideMenuShown) {
            document.getElementById("changeLog").style.display = "none";
            document.getElementById("slideMenuArrow").style.left = "0px";
            document.getElementById("slideMenuArrow").src = "src/assets/textures/arrow.png"
            slideMenuShown = false;
        } else {
            document.getElementById("changeLog").style.display = "block";
            document.getElementById("slideMenuArrow").style.left = "500px";
            document.getElementById("slideMenuArrow").src = "src/assets/textures/arrowIn.png"
            slideMenuShown = true;
        }

    }

    function openShopMenu() {
        if (shopMenuShown) {
            document.getElementById("shop").style.display = "none";
            document.getElementById("shopMenuArrow").style.right = "0px";
            document.getElementById("shopMenuArrow").src = "src/assets/textures/shopArrow.png"
            shopMenuShown = false;
        } else {
            document.getElementById("shop").style.display = "block";
            document.getElementById("shopMenuArrow").style.right = "600px";
            document.getElementById("shopMenuArrow").src = "src/assets/textures/shopArrowIn.png"
            shopMenuShown = true;
        }

    }

    const everyTick = () => {
        if (AutoClickers > 0) {
            let AutoclickersCookies = ((AutoClickers * 1) * AutoclickersProductionRate);
            receiveCookieAuto(AutoclickersCookies);
        }
        if (AutoClickerClickers > 0) {
            AutoClickers += (AutoClickerClickers * 1)
        }
        let formattedCookies = Math.round(cookies).toLocaleString()
        let formattedAutoClickers = AutoClickers.toLocaleString()
        let formattedAutoClickerClickers = AutoClickerClickers.toLocaleString()
        let formattedAutoClickersPerSec = (((AutoClickers * 1) * AutoclickersProductionRate) * 4).toLocaleString()
        let formattedAutoClickerClickersPerSec = (AutoClickerClickers * 4).toLocaleString()
        let formattedAutoClickersProductionRate = (AutoclickersProductionRate * 4).toLocaleString()
        let formattedAutoClickerCost = Math.round(AutoClickerCost).toLocaleString()
        let formattedAutoClickerClickerCost = Math.round(AutoClickerClickerCost).toLocaleString()
        let formattedPriceDecreaseCost = Math.round(PriceDecreaseCost).toLocaleString()
        let formattedProductionIncreaseCost = Math.round(ProductionIncreaseCost).toLocaleString()
        document.title = "this mf has " + formattedCookies + " cookies";
        document.getElementById("cookieDisplay").innerHTML = formattedCookies;
        document.getElementById("cookiePerSecondDisplay").innerHTML = "Cookies Per Second (CPS/s) " + formattedAutoClickersPerSec + "/s";
        document.getElementById("clickersPerSecondDisplay").innerHTML = "Clickers Per Second (CPS/s) " + formattedAutoClickerClickersPerSec + "/s";
        document.getElementById("numAutoclickers").innerHTML = formattedAutoClickers + "x Autoclickers";
        document.getElementById("numAutoclickerClickers").innerHTML = formattedAutoClickerClickers + "x Autoclicker Clickers";
        document.getElementById("totalProductionUpgrades").innerHTML = "Current Production Rate: " + formattedAutoClickersProductionRate + "/s";
        document.getElementById("autoclickerPrice").innerHTML = "Autoclicker Price: " + formattedAutoClickerCost + " Cookies";
        document.getElementById("autoclickerClickerPrice").innerHTML = "Autoclicker Clicker Price: " + formattedAutoClickerClickerCost + " Autoclickers";
        document.getElementById("autoclickerCostDecreasePrice").innerHTML = "Upgrade Price: " + formattedPriceDecreaseCost + " Cookies";
        document.getElementById("autoclickerClickerCostDecreasePrice").innerHTML = "Upgrade Price: " + formattedPriceDecreaseCost + " Cookies";
        document.getElementById("autoclickerProductionIncreasePrice").innerHTML = "Upgrade Price: " + formattedProductionIncreaseCost + " Cookies";
    };

    function saveProgress() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1); // Month is zero-indexed (0 for January, 11 for December)
        const day = currentDate.getDate();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();
        var allVars = {"Cookies" : cookies,
                        "AutoClickers" : AutoClickers,
                        "AutoClickerClickers" : AutoClickerClickers,
                        "CostReductionUpgradesAutoclicker" : CostReductionUpgradesAutoclicker,
                        "CostReductionUpgradesAutoclickerClicker" : CostReductionUpgradesAutoclickerClicker,
                        "AutoClickerCost" : AutoClickerCost,
                        "AutoClickerClickerCost" : AutoClickerClickerCost,
                        "PriceDecreaseCost" : PriceDecreaseCost,
                        "ProductionIncreaseCost" : ProductionIncreaseCost,
                        "AutoclickersProductionRate" : AutoclickersProductionRate};
        var allVarsString = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allVars));
        var a = document.createElement('a');
        a.href = 'data:' + allVarsString;
        a.download = `save-${year}-${month}-${day}-${minutes}:${seconds}.json`;
        a.innerHTML = '';
        a.click();
        hook = false;
    }

    setInterval(everyTick, 250); // Repeat every 1/4 second

    document.getElementById("cookie").onclick = () => receiveCookie(1);
    document.getElementById("shop_1").onclick = () => purchaseAutoClicker();
    document.getElementById("shop_2").onclick = () => purchaseAutoClickerClicker();
    document.getElementById("upgrade_1").onclick = () => upgradeLowerPricesAutoclickers();
    document.getElementById("upgrade_2").onclick = () => upgradeLowerPricesAutoclickerClickers();
    document.getElementById("upgrade_3").onclick = () => upgradeMoreCookiesPerClick();
    document.getElementById("downloadSave").onclick = () => saveProgress();
    document.getElementById("slideMenuArrow").onclick = () => openSlideMenu();
    document.getElementById("shopMenuArrow").onclick = () => openShopMenu();
})();