/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        var allFeedsLength = allFeeds.length;

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. */

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(Array.isArray(allFeeds)).toBeTruthy(); // to check an array exists
            expect(allFeedsLength).not.toBe(0);
        });


        /* Wrote a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty using forEach */

         it('have URLs that are defined & not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeTruthy(); // https://www.sitepoint.com/javascript-truthy-falsy/
                // expect(feed.url).toBeDefined(); // expect to be defined
                // expect(feed.url.length).not.toBe(0); // expect length to be greater than 0
                expect(feed.url).toMatch(/(http(s?))\:\/\//); // Using RegExp to match http:// or https://
            });
        });
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
        //  RegExp literal --> opening & closing forward slashes --> / RegExp in here /
        // s? --> matches if there is 's' a https , ? matches the preceding expression 0 or 1 time
        // (http|https) --> remembers the match within ( ). The parentheses are called capturing parentheses.
        // | or symbol
        //  \/\/ --> backslash \ preceding a special character indicates that the next character is not special & to interpret literally --> //

        // https://mathiasbynens.be/demo/url-regex <-- Another reference
        // Diego perini's is the best --> /_^(?:(?:https?|ftp)://)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}-\x{ffff}0-9]+-?)*[a-z\x{00a1}-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}-\x{ffff}0-9]+-?)*[a-z\x{00a1}-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}-\x{ffff}]{2,})))(?::\d{2,5})?(?:/[^\s]*)?$_iuS/

        /* Wrote a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty */

        it('have names that are defined & not empty', function() {
            for (var i = 0; i < allFeedsLength; i++) {
                expect(allFeeds[i].name).toBeDefined(); // expect to be defined
                expect(typeof allFeeds[i].name).toBe('string'); // to check if names are a string
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });


    /* Wrote a new test suite named "The menu" */
    describe('The menu', function() {
        // Global vars to be accessed
        var $body = $('body');
        var $menuIcon = $('.menu-icon-link');
        var menuVis,
            menuWidth,
            menuOffset;

        /* Wrote a test that ensures the menu element is
         * hidden by default. */

        it('is hidden initially using class: "menu-hidden" on the body div', function() {
            expect($body.hasClass('menu-hidden')).toBeTruthy();
        });
         /* Wrote a test that ensures the menu changes
          * toggles visibility when the menu icon is clicked. */

        it('icon toggles visibility when clicked', function() {
            $menuIcon.click(); // .click() method simulates a mouse click on an element. https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click
            menuWidth = $('body .slide-menu').outerWidth();
            menuOffset = $('body .slide-menu').position().left;
            console.log(menuWidth); // check the width is 192
            console.log(menuOffset); // just checking values
            expect(menuWidth).toBeDefined(); // only true if the slide-menu exists
            expect($body.hasClass('menu-hidden')).toBeFalsy(); // checks to make sure menu-hidden is false

            $menuIcon.click();
            menuWidth = $('body .slide-menu').outerWidth();
            menuOffset = $('body .slide-menu').position().left;
            console.log(menuWidth); // check the width is 192
            console.log(menuOffset); // just checking values
            expect($body.hasClass('menu-hidden')).toBeTruthy(); // has menu-hidden class when clicked again.
        });

    });
    /* Wrote a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* Wrote a test that ensures the loadFeed
         * function is called and completes its work, and there is at least
         * a single .entry element within the .feed container. */

        // Update: This jQuery container element cannot be retrieved correctly before the test begins because
        // of asynchronous feature. You can define the variable here, but you should assign the value to it in the
        // call back of loadFeed in beforeEach or in it.

        var $feedContainerEntry,
            numOfEntries;

         // Ensure loadFeed function works when called
        beforeEach(function(done) { // Jasmine's beforeEach
            loadFeed(0, done);
        });
         // At least 1 single .entry within the .feed container
        it("has at least 1 entry & it's entry link in the .feed container", function(done) {
            $feedContainerEntry = $('div.feed a.entry-link article.entry');
            numOfEntries = $feedContainerEntry.length;
            console.log(numOfEntries); // there is at least 1 entry
            console.log($('div.feed a.entry-link article.entry').html()); // to check the first entry's html
            expect(numOfEntries).toBeGreaterThan(0);
            expect($('.feed .entry-link').children().hasClass('entry')).toBeTruthy(); // to check the child of .feed .entry-link
            expect($('.feed').children().hasClass('entry-link')).toBeTruthy(); // to check the child of .feed
            done();
        });

    });
    /* Wrote a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* Wrote a test that ensures a new feed is loaded
         * by the loadFeed function and that the content actually changes. */

        var feedContainerContentInit,
            feedContainerContentNext;

        beforeEach(function(done) { // Jasmine's beforeEach
            loadFeed(0, function() { // load initial content
                feedContainerContentInit = document.querySelector('.feed').innerHTML; // store it into global variable feedContainerContentInit

                loadFeed(1, function() { // load next content
                    feedContainerContentNext = document.querySelector('.feed').innerHTML; // store it into global variable feedContainerContentNext
                    done(); // Jasmine's asynchronous done() function
                });
            });
        });

        it("successfully changes content using loadFeed()", function(done) {
            expect(feedContainerContentInit).not.toBe(feedContainerContentNext) // compare the two stored content to make sure they are not equal to each other.
            console.log(feedContainerContentInit); // Used to check that they are actually not the same
            console.log(feedContainerContentNext);
            done();
        });
    });
}());
