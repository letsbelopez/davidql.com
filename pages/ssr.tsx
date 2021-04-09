function Page({ data }) {
    return (
        <div>{data.age}</div>
    )
  }

// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
    // const res = await fetch(`https://.../data`)
    const data = await new Promise((res) => {
        res({age: 33});
    })
  
    // Pass data to the page via props
    return data;
}

export default Page;