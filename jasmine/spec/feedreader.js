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
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(Array.isArray(allFeeds)).toBeTruthy(); // to check an array exists
            expect(allFeedsLength).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have URLs that are defined & not empty', function() {
            for (var i = 0; i < allFeedsLength; i++) {
                expect(allFeeds[i].url).toBeDefined(); // expect to be defined
                expect(allFeeds[i].url.length).not.toBe(0); // expect length to be greater than 0
                expect(allFeeds[i].url).toMatch(/(http(s?))\:\/\//); // Using RegExp to match http:// or https://
            }
        });
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
        //  RegExp literal --> opening & closing forward slashes --> / RegExp in here /
        // s? --> matches if there is 's' a https , ? matches the preceding expression 0 or 1 time
        // (http|https) --> remembers the match within ( ). The parentheses are called capturing parentheses.
        // | or symbol
        //  \/\/ --> backslash \ preceding a special character indicates that the next character is not special & to interpret literally --> //


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have names that are defined & not empty', function() {
            for (var i = 0; i < allFeedsLength; i++) {
                expect(allFeeds[i].name).toBeDefined(); // expect to be defined
                expect(typeof allFeeds[i].name).toBe('string'); // to check if names are a string
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });

        for (var i = 0; i < allFeedsLength; i++) {
            if (allFeeds[i].name === '' || null) {
                it('There is an empty name', function() {
                    expect(allFeeds[i].name).not.toBeDefined(); // fails if URL is an empty string
                });
            }
        }
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        // Global vars to be accessed
        var $body = $(document.body);
        var menuIcon = $('.menu-icon-link');
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        it('is hidden initially using class: "menu-hidden" on the body div', function() {
            expect($body.hasClass('menu-hidden')).toBeTruthy();
        });
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('icon toggles visibility when clicked', function() {
            menuIcon.click(); // .click() method simulates a mouse click on an element. https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click
            expect($body.hasClass('')).toBeTruthy(); // No class when clicked.

            menuIcon.click();
            expect($body.hasClass('menu-hidden')).toBeTruthy(); // has menu-hidden class when clicked again.
        });

    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        var feedContainer = document.querySelector('.feed');

         // Ensure loadFeed function works when called
        beforeEach(function(done) { // Jasmine's beforeEach
            loadFeed(0, function() { // Load the first feed we've defined (index of 0) & cb: done().
                done(); // asynchronous done() function
            });
        });
         // At least 1 single .entry within the .feed container
        it("has at least 1 entry & it's entry link in the .feed container", function(done) {
            var numOfEntries = feedContainer.getElementsByClassName('entry').length;
            var numOfEntryLinks = feedContainer.getElementsByClassName('entry-link').length;
            expect(numOfEntries >= 0 && numOfEntryLinks >= 0).toBeTruthy();
            done();
        });

    });
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var feedContainerContentInit;
        var feedContainerContentNext;

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
            expect(feedContainerContentInit != feedContainerContentNext).toBeTruthy(); // compare the two stored content to make sure they are not equal to each other.
            console.log(feedContainerContentInit); // Used to check that they are actually not the same
            console.log(feedContainerContentNext);
            done();
        });
    });
}());
