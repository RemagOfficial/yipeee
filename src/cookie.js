(function() {
    console.debug("Cookie clicker init");
    let AutoClickerCost = 20;
    let AutoClickerClickerCost = 20;
    let PriceDecreaseCost = 200;
    let ProductionIncreaseCost = 200;
    let cookies = getCookie("cookies") ? parseInt(getCookie("cookies")) : 0;
    let shopShown = false;

    let AutoclickersProductionRate = getCookie("AutoClickersProductionRate") ? parseInt(getCookie("AutoClickersProductionRate")) : 1;

    let AutoClickers = getCookie("AutoClickers") ? parseInt(getCookie("AutoClickers")) : 0;
    let AutoClickerClickers = getCookie("AutoClickerClickers") ? parseInt(getCookie("AutoClickerClickers")) : 0;
    let CostReductionUpgradesAutoclicker = getCookie("CostReductionUpgradesAutoclicker") ? parseInt(getCookie("CostReductionUpgradesAutoclicker")) : 0;
    let CostReductionUpgradesAutoclickerClicker = getCookie("CostReductionUpgradesAutoclickerClicker") ? parseInt(getCookie("CostReductionUpgradesAutoclickerClicker")) : 0;

    let formattedCookies = 0;
    let formattedAutoClickers = 0;
    let formattedAutoClickerClickers = 0;

    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    function getCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function clearCookies() {
      let browserCookies = document.cookie.split(';');
      console.log(browserCookies);

      // set 1 Jan, 1970 expiry for every cookies
      for (let i = 0; i < browserCookies.length; i++)
      document.cookie = browserCookies[i] + "=;expires=" + new Date(0).toUTCString();
      console.log(browserCookies);
    }

    function receiveCookie(amount) {
        cookies += amount;
        let clicks = document.getElementById("clicks");
        clicks.className = "show";
        setTimeout(function(){ clicks.className = clicks.className.replace("show", ""); }, 3000);
    }

    function receiveCookieAuto(amount) {
        cookies += amount;
        let formattedCookies = cookies.toLocaleString()
        document.getElementById("cookieDisplay").innerHTML = formattedCookies;
        document.title = "this mf has " + formattedCookies + " cookies";
        setCookie("cookies", cookies, 30);
    }

    function toggleShopDisplay() {
        if (shopShown) {            AutoClickers > 0;
            document.getElementById("shopMenuDiv").style.display = "none";
            shopShown = false;
        } else {
            document.getElementById("shopMenuDiv").style.display = "block";
            shopShown = true;
        }

    }

    function toggleUpgradeDisplay() {
        if (shopShown) {            AutoClickers > 0;
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

        setTimeout(function(){ toaster.className = toaster.className.replace("show", ""); }, 3000)
    }

    function purchaseAutoClicker() {
            if (cookies >= AutoClickerCost) {
                cookies = cookies - AutoClickerCost;
                AutoClickers++;
                showToast("Autoclicker Purchased", "#333", "#000")
            } else {
              showToast("You cannot afford an autoclicker!", "rgb(121, 28, 28)")
            }
            setCookie("AutoClickers", AutoClickers, 30);
    }

    function purchaseAutoClickerClicker() {
            if (AutoClickers >= AutoClickerClickerCost) {
                AutoClickers = AutoClickers - AutoClickerClickerCost;
                AutoClickerClickers++;
                showToast("Autoclicker Clicker Purchased", "#333", "#000")
            } else {
              showToast("You cannot afford an autoclicker clicker!", "rgb(121, 28, 28)")
            }
            setCookie("AutoClickerClickers", AutoClickerClickers, 30);
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
            setCookie("CostReductionUpgradesAutoclicker", CostReductionUpgradesAutoclicker, 30);
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
            setCookie("CostReductionUpgradesAutoclickerClicker", CostReductionUpgradesAutoclickerClicker, 30);
    }

    function upgradeMoreCookiesPerClick() {
            if (cookies >= ProductionIncreaseCost) {
                cookies = cookies - ProductionIncreaseCost;
                AutoclickersProductionRate++
                showToast("Increased autoclicker production by 1", "#333", "#000")
            } else {
              showToast("You cannot afford this upgrade!", "rgb(121, 28, 28)")
            }
            setCookie("AutoClickersProductionRate", AutoClickersProductionRate, 30);
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
        document.title = "this mf has " + formattedCookies + " cookies";
        document.getElementById("cookieDisplay").innerHTML = formattedCookies;
        document.getElementById("cookiePerSecondDisplay").innerHTML = "Cookies Per Second (CPS/s) " + formattedAutoClickersPerSec + "/s";
        document.getElementById("clickersPerSecondDisplay").innerHTML = "Clickers Per Second (CPS/s) " + formattedAutoClickerClickersPerSec + "/s";
        document.getElementById("numAutoclickers").innerHTML = formattedAutoClickers + "x Autoclickers";
        document.getElementById("numAutoclickerClickers").innerHTML = formattedAutoClickerClickers + "x Autoclicker Clickers";
        document.getElementById("totalPriceDecreaseAutoclickers").innerHTML = "Current Autoclicker Cost: " + AutoClickerCost + " Cookies";
        document.getElementById("totalPriceDecreaseAutoclickerClickers").innerHTML = "Current Autoclicker Clicker Cost: " + AutoClickerClickerCost + " Cookies";
        document.getElementById("totalProductionUpgrades").innerHTML = "Current Autoclicker Production: " + (AutoclickersProductionRate * 4) + "/s";
    };

    setInterval(everyTick, 250); // Repeat every 1/4 second

    document.getElementById("cookie").onclick = () => receiveCookie(1);
    document.getElementById("toggleShop").onclick = () => toggleShopDisplay();
    document.getElementById("shop_1").onclick = () => purchaseAutoClicker();
    document.getElementById("shop_2").onclick = () => purchaseAutoClickerClicker();
})();