import ItemsCrudPage from "@lib/crud/ItemCrudPage";
import {collections} from "@/app/sparkcms.config";
import {notFound} from 'next/navigation';

export default async function Page({params}: {params: {collection: string}}) {
    const {collection} = await params;

    const collectionConfig = collections.find(it => it.config.slug  === collection);

    if (!collectionConfig) {
        return notFound();
    }

    return <ItemsCrudPage collectionConfig={collectionConfig} />;
}