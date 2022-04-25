export default async function handler(req, res) {

    const neo4j = require('neo4j-driver')

    const uri = 'neo4j+s://06f06c4a.databases.neo4j.io';
    const user = 'neo4j';
    const password = 'eKJRSyepu8l6wEFFjnfqWo-jUZeTKGnbJX48QehyFvQ';

    const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
    const session = driver.session()

    const person1Name = 'Justin'

    try {
        // To learn more about the Cypher syntax, see https://neo4j.com/docs/cypher-manual/current/
        // The Reference Card is also a good resource for keywords https://neo4j.com/docs/cypher-refcard/current/
        const readQuery = `MATCH (u:User)
                      WHERE u.name = 'Justin'
                      RETURN u.name AS name`
        const readResult = await session.readTransaction(tx =>
            tx.run(readQuery, { personName: person1Name })
        )
        readResult.records.forEach(record => {
            console.log(`Found person: ${record.get('name')}`)
        })
    } catch (error) {
        console.error('Something went wrong: ', error)
    } finally {
        await session.close()
    }
    // Don't forget to close the driver connection when you're finished with it
    await driver.close()

    res.status(200).json({ name: 'Justin Doe' });
})();