It’s the year 2029. Faris, a curly-haired, slightly neurotic 21-year-old college student, is concerned about the ever-growing influence of Jeff Bezos and his economic empire. In particular, Faris wants to know how much money he spends on Bezos-related companies (his Bezos’ "share of wallet").

So, he does what any enterprising young student would do: he builds a simple web tool to calculate how much money he spends on Bezos-related companies. This tool does the following in one UI:

- Shows Faris a list of his transactions for the month of January 2029, ordered by date.
- Allows him to visually discern which transactions are known to be Bezos-related companies.
- Lets him see how much money he pays to these Bezos-affiliated companies (both as a total dollar amount, and as a percentage of his spend).
- Allows him to mark or unmark any specific transaction as being Bezos-related, even if it is not to a known Bezos-related company.
    - If Faris marks (or unmarks) any transaction as being Bezos-related, all other transactions to the same *merchant name* are also be marked or unmarked in the same way. For example, if he marks any Lyft transaction as Bezos-related, all Lyft transactions become Bezos-related.
    - Any changes Faris makes are persisted for future use.

### Tech Stack

Faris built this web app using the following:

- Typescript
- React + [Material UI](https://mui.com/)
- Node.js + express
- REST
- Postgres + [Prisma](https://www.prisma.io/)

### Implementation Details:

- In Faris’s implementation, Bezos owns **Amazon**, the **Washington Post,** **Whole Foods**, and space-travel company **Blue Origin**. Therefore, in the `prisma/seed.ts` file to seed the database, you’ll see that Faris has already marked those merchants as belonging to Bezos.
- Faris didn’t bother with authentication or security. (In 2029, it works magically through biometrics.)
- Faris's spending transactions are fetched from `GET` call to this URL: [https://61b3dea5af5ff70017ca20bf.mockapi.io**/**transactions](https://61b3dea5af5ff70017ca20bf.mockapi.io/transactions)**.** (This is a simplified version of what you’d get from a service like [Plaid](http://plaid.com/).)
    
    <aside>
    💡 Faris makes this `GET` request from the backend to avoid a  `No 'Access-Control-Allow-Origin' header` (also known as a [CORS Error](https://www.contentstack.com/docs/developers/how-to-guides/understanding-and-resolving-cors-error/)).  Note that, if you decide to move this `GET` request to the frontend in your implementation, you may encounter this issue. (Feel free to reach out with questions if this is unclear.)
    
    </aside>
    
    - New transactions can be added to this URL *every 10 seconds*, but transactions are immutable and can be identified by ID. (Once a transaction is added, it can never be removed.) If new transactions are added, Faris’s front-end detects these new transactions and updates automatically (i.e., without requiring a page refresh) to display these new transactions.
    
    <aside>
    💡 If you want to test this out, you can clone the endpoint using this magic link: https://mockapi.io/clone/61b3dea5af5ff70017ca20c0. This will create a new fake endpoint that you can modify by adding, removing, and editing the underlying data.
    
    </aside>
    
- Faris decided not to store the transaction data itself, but he does store all data relevant to the application, such that Faris’s changes persist for future use. Specifically, when Faris updates his Bezos-related expenses, those changes are saved to the database.