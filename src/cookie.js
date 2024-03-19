(function () {
    console.debug("Cookie clicker init");
    let AutoClickerCost = 20;
    let AutoClickerClickerCost = 20;
    let PriceDecreaseCost = 200;
    let ProductionIncreaseCost = 200;
    let cookies = 0;


    let shopShown = false;
    let slideMenuShown = false;

    let AutoclickersProductionRate = 1;

    let AutoClickers = 0;
    let AutoClickerClickers = 0;
    let CostReductionUpgradesAutoclicker = 0;
    let CostReductionUpgradesAutoclickerClicker = 0;

    let formattedCookies = 0;
    let formattedAutoClickers = 0;
    let formattedAutoClickerClickers = 0;

    const fileInput = document.getElementById('saveImport');

    document.addEventListener('DOMContentLoaded', function() {

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
                        const AutoclickersProductionRateFromJSON = jsonData.AutoclickersProductionRate

                        cookies = cookiesFromJSON;
                        AutoClickers = AutoClickersFromJSON;
                        AutoClickerClickers = AutoClickerClickersFromJSON;
                        CostReductionUpgradesAutoclicker = CostReductionUpgradesAutoclickerFromJSON;
                        CostReductionUpgradesAutoclickerClicker = CostReductionUpgradesAutoclickerClickerFromJSON;
                        AutoClickerCost = AutoClickerCostFromJSON;
                        AutoClickerClickerCost = AutoClickerClickerCostFromJSON;
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
        let clicks = document.getElementById("clicks");
        clicks.className = "show";
        setTimeout(function () {
            clicks.className = clicks.className.replace("show", "");
        }, 3000);
    }

    function receiveCookieAuto(amount) {
        cookies += amount;
        let formattedCookies = cookies.toLocaleString()
        document.getElementById("cookieDisplay").innerHTML = formattedCookies;
        document.title = "this mf has " + formattedCookies + " cookies";
    }

    function toggleShopDisplay() {
        if (shopShown) {
            AutoClickers > 0;
            document.getElementById("shopMenuDiv").style.display = "none";
            shopShown = false;
        } else {
            document.getElementById("shopMenuDiv").style.display = "block";
            shopShown = true;
        }

    }

    function toggleUpgradeDisplay() {
        if (shopShown) {
            AutoClickers > 0;
            document.getElementById("upgradeMenuDiv").style.display = "none";
            shopShown = false;
        } else {
            document.getElementById("upgradeMenuDiv").style.display = "block";
            shopShown = true;
        }

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
            showToast("Autoclicker Purchased", "#333", "#000")
        } else {
            showToast("You cannot afford an autoclicker!", "rgb(121, 28, 28)")
        }
    }

    function purchaseAutoClickerClicker() {
        if (AutoClickers >= AutoClickerClickerCost) {
            AutoClickers = AutoClickers - AutoClickerClickerCost;
            AutoClickerClickers++;
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
            showToast("Decreased autoclicker clicker price by 5%", "#333", "#000")
        } else {
            showToast("You cannot afford this upgrade!", "rgb(121, 28, 28)")
        }
    }

    function upgradeMoreCookiesPerClick() {
        if (cookies >= ProductionIncreaseCost) {
            cookies = cookies - ProductionIncreaseCost;
            AutoclickersProductionRate++
            showToast("Increased autoclicker production by 4/s", "#333", "#000")
        } else {
            showToast("You cannot afford this upgrade!", "rgb(121, 28, 28)")
        }
    }

    function openSlideMenu() {
        if (slideMenuShown) {
            document.getElementById("slideMenuDiv").style.display = "none";
            document.getElementById("slideMenuArrow").style.left = "0px";
            document.getElementById("slideMenuArrow").src = "src/assets/textures/arrow.png"
            slideMenuShown = false;
        } else {
            document.getElementById("slideMenuDiv").style.display = "block";
            document.getElementById("slideMenuArrow").style.left = "500px";
            document.getElementById("slideMenuArrow").src = "src/assets/textures/arrowIn.png"
            slideMenuShown = true;
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
        document.title = "this mf has " + formattedCookies + " cookies";
        document.getElementById("cookieDisplay").innerHTML = formattedCookies;
        document.getElementById("cookiePerSecondDisplay").innerHTML = "Cookies Per Second (CPS/s) " + formattedAutoClickersPerSec + "/s";
        document.getElementById("clickersPerSecondDisplay").innerHTML = "Clickers Per Second (CPS/s) " + formattedAutoClickerClickersPerSec + "/s";
        document.getElementById("numAutoclickers").innerHTML = formattedAutoClickers + "x Autoclickers";
        document.getElementById("numAutoclickerClickers").innerHTML = formattedAutoClickerClickers + "x Autoclicker Clickers";
        document.getElementById("totalPriceDecreaseAutoclickers").innerHTML = "Current Autoclicker Cost: " + AutoClickerCost + " Cookies";
        document.getElementById("totalPriceDecreaseAutoclickerClickers").innerHTML = "Current Autoclicker Clicker Cost: " + AutoClickerClickerCost + " AutoClickers";
        document.getElementById("totalProductionUpgrades").innerHTML = "Current Autoclicker Production: " + formattedAutoClickersProductionRate + "/s";
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
                        "AutoclickersProductionRate" : AutoclickersProductionRate};
        var allVarsString = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allVars));
        var a = document.createElement('a');
        a.href = 'data:' + allVarsString;
        a.download = `save-${year}-${month}-${day}-${minutes}:${seconds}.json`;
        a.innerHTML = '';
        a.click();
    }

    setInterval(everyTick, 250); // Repeat every 1/4 second

    document.getElementById("cookie").onclick = () => receiveCookie(1);
    document.getElementById("toggleShop").onclick = () => toggleShopDisplay();
    document.getElementById("shop_1").onclick = () => purchaseAutoClicker();
    document.getElementById("shop_2").onclick = () => purchaseAutoClickerClicker();
    document.getElementById("toggleUpgrade").onclick = () => toggleUpgradeDisplay();
    document.getElementById("upgrade_1").onclick = () => upgradeLowerPricesAutoclickers();
    document.getElementById("upgrade_2").onclick = () => upgradeLowerPricesAutoclickerClickers();
    document.getElementById("upgrade_3").onclick = () => upgradeMoreCookiesPerClick();
    document.getElementById("downloadSave").onclick = () => saveProgress();
    document.getElementById("slideMenuArrow").onclick = () => openSlideMenu();
})();