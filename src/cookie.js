
(function () {
    console.debug("Cookie clicker init");
    let AutoClickerCost = 20;
    let AutoClickerClickerCost = 20;
    let PriceDecreaseCost = 200;
    let ProductionIncreaseCost = 200;
    let cookies = 0;

    let slideMenuShown = false;
    let shopMenuShown = false;

    let AutoclickersProductionRate = 1;

    let AutoClickers = 0;
    let AutoClickerClickers = 0;
    let CostReductionUpgradesAutoclicker = 0;
    let CostReductionUpgradesAutoclickerClicker = 0;

    const fileInput = document.getElementById('saveImport');

    var hook = true;

/**
 * Event handler for the 'beforeunload' event.
 *
 * @param {Event} event - The event object.
 */
function onBeforeUnloadEvent(event) {
    // If the hook is true, prevent the default action and set a warning message.
    if (hook) {
        event.preventDefault(); // Prevents the default action of leaving the page.
        event.returnValue = 'Warning: This game does not autosave. Use the download button.'; // Sets the return value of the event.
    }

    // Deletes the return value of the event.
    delete event.returnValue;
}
    
    window.addEventListener('beforeunload', onBeforeUnloadEvent);

    document.addEventListener('DOMContentLoaded', function() {

        console.log("Hey, what are you doing here?")
        console.log("Why'd you open this?")

        fileInput.addEventListener('change', function(event) {
            const file = event.target.files[0];

            if (file) {
                const reader = new FileReader();

                reader.onload = function(e) {
                    /**
                     * Event handler for when the file is loaded.
                     *
                     * @param {Event} e - The event object.
                     */

                    const contents = e.target.result; // Get the contents of the file

                    try {
                        /**
                         * Parse the JSON data from the file contents.
                         * If parsing fails, an error message will be logged.
                         */
                        const jsonData = JSON.parse(contents);

                        // Extract the values from the JSON data
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

                        // Update the game variables with the values from the JSON data
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
                        /**
                         * If there's an error while parsing the JSON, log the error.
                         *
                         * @param {Error} error - The error object.
                         */
                        console.error('Error parsing JSON:', error);
                    }
                };

                reader.readAsText(file); // Read the file as text
            }
        }) 

    })

/**
 * Increase the number of cookies by the given amount.
 *
 * @param {number} amount - The amount to increase the cookie count by.
 */
function receiveCookie(amount) {
    // Increase the cookie count
    cookies += amount;

    // Show the "clicks" element
    document.getElementById("clicks").style.display = "block";

    // Hide the "clicks" element after 100ms
    setTimeout(() => {
        document.getElementById("clicks").style.display = "none";
    }, 100);
}

    /*
    function receiveCookieAuto(amount) {
        cookies += amount;
        let formattedCookies = cookies.toLocaleString()
        document.getElementById("cookieDisplay").innerHTML = formattedCookies;
        document.title = "this mf has " + formattedCookies + " cookies";
    }
    */

/**
 * Displays a toast message with the given text, colour, and border color.
 *
 * @param {string} text - The text to display in the toast.
 * @param {string} colour - The background color of the toast.
 * @param {string} borderColor - The border color of the toast.
 */
function showToast(text, colour, borderColor) {
    // Get the toast element
    let toaster = document.getElementById("toasts");

    // Set the text, colour, and border color of the toast
    toaster.innerHTML = text;
    toaster.style.backgroundColor = colour;
    toaster.style.borderColor = borderColor;

    // Add the "show" class to make the toast visible
    toaster.className = "show";

    // After 3 seconds, remove the "show" class to hide the toast
    setTimeout(function () {
        toaster.className = toaster.className.replace("show", "");
    }, 3000)
}

/**
 * Purchases an autoclicker.
 *
 * This function checks if the player has enough cookies to purchase an autoclicker.
 * If the player has enough cookies, it deducts the cost of the autoclicker from the
 * player's cookie count, increments the count of autoclickers, and updates the cost
 * of the autoclicker. Finally, it displays a toast message indicating the success or
 * failure of the purchase.
 */
function purchaseAutoClicker() {
    // Check if the player has enough cookies to purchase an autoclicker
    if (cookies >= AutoClickerCost) {
        // Deduct the cost of the autoclicker from the player's cookie count
        cookies = cookies - AutoClickerCost;
        
        // Increment the count of autoclickers
        AutoClickers++;
        
        // Update the cost of the autoclicker
        AutoClickerCost = Math.round((Math.round(AutoClickerCost) + (Math.round(AutoClickerCost) * 0.20)));
        
        // Display a toast message indicating the success of the purchase
        showToast("Autoclicker Purchased", "#333", "#000");
    } else {
        // Display a toast message indicating the failure of the purchase
        showToast("You cannot afford an autoclicker!", "rgb(121, 28, 28)");
    }
}

    /**
     * Purchases an autoclicker clicker.
     *
     * This function checks if the player has enough autoclickers to purchase
     * an autoclicker clicker. If the player has enough autoclickers, it deducts
     * the cost of the autoclicker clicker from the player's autoclicker count and
     * increases the count of autoclicker clickers. It also updates the cost
     * of the autoclicker clicker and displays a toast message indicating the
     * success or failure of the purchase.
     */
    function purchaseAutoClickerClicker() {
        // Check if the player has enough autoclickers to purchase an autoclicker clicker
        if (AutoClickers >= AutoClickerClickerCost) {
            // Deduct the cost of the autoclicker clicker from the player's autoclicker count
            AutoClickers = AutoClickers - AutoClickerClickerCost;
            // Increase the count of autoclicker clickers
            AutoClickerClickers++;
            // Update the cost of the autoclicker clicker
            AutoClickerClickerCost = Math.round((Math.round(AutoClickerClickerCost) + (Math.round(AutoClickerClickerCost) * 0.20)));
            // Display toast message indicating the success of the purchase
            showToast("Autoclicker Clicker Purchased", "#333", "#000")
        } else {
            // Display toast message indicating the failure of the purchase
            showToast("You cannot afford an autoclicker clicker!", "rgb(121, 28, 28)")
        }
    }

    /**
     * Upgrades the lower prices of autoclickers.
     *
     * This function reduces the cost of autoclickers if the player
     * has enough cookies. It deducts the cost of the upgrade from the
     * player's cookie count and decreases the cost of the autoclicker.
     * It also updates the cost of the upgrade and displays a toast
     * message indicating the success or failure of the upgrade.
     */
    function upgradeLowerPricesAutoclickers() {
        // Check if player has enough cookies to buy the upgrade
        if (cookies >= PriceDecreaseCost) {
            // Deduct the cost of the upgrade from the player's cookie count
            cookies = cookies - PriceDecreaseCost;
            
            // Decrease the cost of the autoclicker
            AutoClickerCost = (AutoClickerCost - (AutoClickerCost * 0.05)).toFixed(2);
            
            // Increment the count of cost reduction upgrades bought
            CostReductionUpgradesAutoclicker++;
            
            // Increase the cost of the upgrade
            PriceDecreaseCost = Math.round((Math.round(PriceDecreaseCost) + (Math.round(PriceDecreaseCost) * 0.20)));
            
            // Display a toast message indicating the success of the upgrade
            showToast("Decreased autoclicker price by 5%", "#333", "#000")
        } else {
            // Display a toast message indicating the failure of the upgrade
            showToast("You cannot afford this upgrade!", "rgb(121, 28, 28)")
        }
    }

    /**
     * Upgrades the price of autoclicker clickers.
     *
     * This function reduces the cost of autoclicker clickers if the player
     * has enough cookies. It deducts the cost of the upgrade from the
     * player's cookie count and decreases the cost of the autoclicker
     * clicker. It also updates the cost of the upgrade and displays a toast
     * message indicating the success or failure of the upgrade.
     */
    function upgradeLowerPricesAutoclickerClickers() {
        // Check if the player has enough cookies
        if (cookies >= PriceDecreaseCost) {
            // Deduct the cost of the upgrade from the player's cookie count
            cookies = cookies - PriceDecreaseCost;

            // Decrease the cost of the autoclicker clicker
            AutoClickerClickerCost = (AutoClickerClickerCost - (AutoClickerClickerCost * 0.05)).toFixed(2);

            // Increment the counter for cost reduction upgrades
            CostReductionUpgradesAutoclickerClicker++;

            // Update the cost of the upgrade
            PriceDecreaseCost = Math.round((Math.round(PriceDecreaseCost) + (Math.round(PriceDecreaseCost) * 0.20)));

            // Display a toast message indicating the success of the upgrade
            showToast("Decreased autoclicker clicker price by 5%", "#333", "#000")
        } else {
            // Display a toast message indicating the failure of the upgrade
            showToast("You cannot afford this upgrade!", "rgb(121, 28, 28)")
        }
    }

    /**
     * Upgrades the autoclicker's production rate.
     *
     * This function upgrades the autoclicker's production rate if the player
     * has enough cookies. It deducts the cost of the upgrade from the
     * player's cookie count and increases the autoclicker's production rate.
     * It also updates the cost of the upgrade and displays a toast message
     * indicating the success or failure of the upgrade.
     */
    function upgradeMoreCookiesPerClick() {
        // Check if the player has enough cookies
        if (cookies >= ProductionIncreaseCost) {
            // Deduct the cost of the upgrade
            cookies = cookies - ProductionIncreaseCost;
            // Increase the autoclicker's production rate
            AutoclickersProductionRate++;
            // Update the cost of the upgrade
            ProductionIncreaseCost = Math.round((Math.round(ProductionIncreaseCost) + (Math.round(ProductionIncreaseCost) * 0.20)));
            // Display a toast message indicating success
            showToast("Increased autoclicker production by 4/s", "#333", "#000");
        } else {
            // Display a toast message indicating failure
            showToast("You cannot afford this upgrade!", "rgb(121, 28, 28)");
        }
    }

/**
 * Toggles the visibility of the slide menu.
 * 
 * When the menu is opened, it:
 * - Sets the display property of the "changeLog" element to "block"
 * - Sets the left position of the "slideMenuArrow" element to "500px"
 * - Sets the src attribute of the "slideMenuArrow" element to "src/assets/textures/arrowIn.png"
 * - Sets the slideMenuShown variable to true
 * 
 * When the menu is closed, it:
 * - Sets the display property of the "changeLog" element to "none"
 * - Sets the left position of the "slideMenuArrow" element to "0px"
 * - Sets the src attribute of the "slideMenuArrow" element to "src/assets/textures/arrow.png"
 * - Sets the slideMenuShown variable to false
 */
function openSlideMenu() {
    if (slideMenuShown) {
        // Hide the menu and reset its style
        document.getElementById("changeLog").style.display = "none";
        document.getElementById("slideMenuArrow").style.left = "0px";
        document.getElementById("slideMenuArrow").src = "src/assets/textures/arrow.png";
        slideMenuShown = false;
    } else {
        // Show the menu and update its style
        document.getElementById("changeLog").style.display = "block";
        document.getElementById("slideMenuArrow").style.left = "500px";
        document.getElementById("slideMenuArrow").src = "src/assets/textures/arrowIn.png";
        slideMenuShown = true;
    }
}

/**
 * Toggles the visibility of the shop menu.
 * When the menu is opened, it sets the display property of the "shop" element to "block",
 * and updates the style of the "shopMenuArrow" element.
 * When the menu is closed, it sets the display property of the "shop" element to "none",
 * and updates the style of the "shopMenuArrow" element.
 */
function openShopMenu() {
    if (shopMenuShown) {
        // Hide the shop menu
        document.getElementById("shop").style.display = "none";
        // Move the shop menu arrow to the left
        document.getElementById("shopMenuArrow").style.right = "0px";
        // Set the source of the shop menu arrow to the regular arrow image
        document.getElementById("shopMenuArrow").src = "src/assets/textures/shopArrow.png";
        // Set the shopMenuShown flag to false
        shopMenuShown = false;
    } else {
        // Show the shop menu
        document.getElementById("shop").style.display = "block";
        // Move the shop menu arrow to the right
        document.getElementById("shopMenuArrow").style.right = "600px";
        // Set the source of the shop menu arrow to the pointed arrow image
        document.getElementById("shopMenuArrow").src = "src/assets/textures/shopArrowIn.png";
        // Set the shopMenuShown flag to true
        shopMenuShown = true;
    }

}

/**
 * This function is called every tick to update the game state.
 * It calculates the cookies and autoclickers per second,
 * updates the UI, and increments the global cookie count.
 */
const everyTick = () => {
    // Calculate the cookies and autoclickers produced per second
    let autoclickersCookies = AutoClickers * AutoclickersProductionRate;
    let autoclickerClickersCookies = AutoClickerClickers * 4;
    let productionRate = AutoclickersProductionRate * 4;

    // Increment the global cookie count
    cookies += autoclickersCookies + autoclickerClickersCookies;
    AutoClickers += AutoClickerClickers;

    // Format the numbers for display
    let [cookiesStr, autoClickersStr, autoClickerClickersStr, productionRateStr, autoClickerCostStr, autoClickerClickerCostStr, priceDecreaseCostStr, productionIncreaseCostStr]
        = [cookies, AutoClickers, AutoClickerClickers, productionRate, AutoClickerCost, AutoClickerClickerCost, PriceDecreaseCost, ProductionIncreaseCost]
        .map(num => Math.round(num).toLocaleString());

    // Update the UI
    document.title = `this mf has ${cookiesStr} cookies`;
    document.getElementById("cookieDisplay").textContent = cookiesStr;
    document.getElementById("cookiePerSecondDisplay").textContent = `Cookies Per Second (CPS/s) ${(autoclickersCookies/4).toLocaleString()} /s`;
    document.getElementById("clickersPerSecondDisplay").textContent = `Clickers Per Second (CPS/s) ${autoclickerClickersCookies.toLocaleString()} /s`;
    document.getElementById("numAutoclickers").textContent = `${autoClickersStr}x Autoclickers`;
    document.getElementById("numAutoclickerClickers").textContent = `${autoClickerClickersStr}x Autoclicker Clickers`;
    document.getElementById("totalProductionUpgrades").textContent = `Current Production Rate: ${productionRateStr} /s`;
    document.getElementById("autoclickerPrice").textContent = `Autoclicker Price: ${autoClickerCostStr} Cookies`;
    document.getElementById("autoclickerClickerPrice").textContent = `Autoclicker Clicker Price: ${autoClickerClickerCostStr} Autoclickers`;
    document.getElementById("autoclickerCostDecreasePrice").textContent = `Upgrade Price: ${priceDecreaseCostStr} Cookies`;
    document.getElementById("autoclickerClickerCostDecreasePrice").textContent = `Upgrade Price: ${priceDecreaseCostStr} Cookies`;
    document.getElementById("autoclickerProductionIncreasePrice").textContent = `Upgrade Price: ${productionIncreaseCostStr} Cookies`;
};

    /**
     * Saves the current progress of the game as a JSON file.
     * The file name includes the current date and time.
     */
    function saveProgress() {
        // Get the current date and time
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1); // Month is zero-indexed (0 for January, 11 for December)
        const day = currentDate.getDate();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();

        // Create an object with all the game variables
        var allVars = {
            "Cookies" : cookies,
            "AutoClickers" : AutoClickers,
            "AutoClickerClickers" : AutoClickerClickers,
            "CostReductionUpgradesAutoclicker" : CostReductionUpgradesAutoclicker,
            "CostReductionUpgradesAutoclickerClicker" : CostReductionUpgradesAutoclickerClicker,
            "AutoClickerCost" : AutoClickerCost,
            "AutoClickerClickerCost" : AutoClickerClickerCost,
            "PriceDecreaseCost" : PriceDecreaseCost,
            "ProductionIncreaseCost" : ProductionIncreaseCost,
            "AutoclickersProductionRate" : AutoclickersProductionRate
        };

        // Convert the object to a JSON string
        var allVarsString = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allVars));

        // Create a download link for the JSON file
        var a = document.createElement('a');
        a.href = 'data:' + allVarsString;
        a.download = `save-${year}-${month}-${day}-${minutes}:${seconds}.json`;
        a.innerHTML = '';

        // Trigger the download
        a.click();

        // Reset the hook flag
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