console.log('Running tests for Recipe Recommender App\n');

const fs = require('fs');
const path = require('path');

const tests = {
    passed: 0,
    failed: 0
};

console.log('\nTesting API connectivity:\n');
const https = require('https');

https.get('https://www.themealdb.com/api/json/v1/1/random.php', (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
        data += chunk;
    });
    resp.on('end', () => {
        try {
            const meal = JSON.parse(data);
            if(meal.meals && meal.meals.length > 0)
            {
                console.log('TheMealDB API is accessible');
                console.log(`   Sample recipe: ${meal.meals[0].strMeal}`);
                tests.passed++;
            }
        }
        catch(e)
        {
            console.log('Error parsing API response');
            tests.failed++;
        }

        console.log('\n' + '='.repeat(50));
        console.log(`   Passed: ${tests.passed}`);
        console.log(`   Failed: ${tests.failed}`);
        console.log('='.repeat(50));

        if(tests.failed === 0)
        {
            console.log('\nAll tests passed!.');
            console.log('Open: http://localhost:3000');
        }
        else
        {
            console.log('\n⚠Some tests failed.');
        }
    });
}).on('error', (err) => {
    console.log('Error connecting to API:', err.message);
    tests.failed++;
});