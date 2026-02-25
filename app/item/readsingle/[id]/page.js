import Image from "next/image";
import Link from "next/link";

const getSingleItem = async (id) => {
  console.log(id);
  const responce = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`,
    { cache: "no-store" }
  );
  const jsonData = await responce.json();
  const singleItem = jsonData.singleItem;
  return singleItem;
}

const ReadSingleItem = async (context) => {
  console.log(context);

  const params = await context.params;
  const singleItem = await getSingleItem(params.id);
  return (
    <div>
      <div>
        {/* <Image src={singleItem.image} width={750} height={500} alt="item_image" priority /> */}
      </div>
      <div>
        <h1>{singleItem.title}</h1>
        <div className="date">投稿日: {singleItem.postDate}</div>
        <div className="date">更新日: {singleItem.editDate}</div>
        <hr></hr>
        <p>
          {singleItem.description}
        </p>
        <div>
          <Link href={`/item/update/${singleItem._id}`}>編集</Link>
          /
          <Link href={`/item/delete/${singleItem._id}`}>削除</Link>
        </div>
      </div>

    </div>
  )
}

export default ReadSingleItem;