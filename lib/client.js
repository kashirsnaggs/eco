import sanityClient from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"

// console.log("here first",process.env.REACT_APP_SANITY_PROJECT_ID)
export const client= sanityClient({
    projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset:"production",
    apiVersion:"2022-10-05",
    useCdn:true,
    token:process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder= imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);