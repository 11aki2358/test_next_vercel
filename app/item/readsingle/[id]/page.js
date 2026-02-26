// import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from 'react';
import parse from 'html-react-parser';

const getSingleItem = async (id) => {

  const responce = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`,
    { cache: "no-store" }
  );

  const jsonData = await responce.json();
  const singleItem = jsonData.singleItem;
  return singleItem;
}

const ReadSingleItem = async (context) => {

  const params = await context.params;
  const singleItem = await getSingleItem(params.id);

  return (

    <div className="main">
      <div className="main_back"> </div>

      {/* <div> */}
      {/* <Image src={singleItem.image} width={750} height={500} alt="item_image" priority /> */}
      {/* </div> */}

      <div className="singleArticle">

        <h2>{singleItem.title}</h2>

        <div className="date_box">
          <div className="date">
            投稿日: {singleItem.postDate}
          </div>
        </div>
        <div className="date_box">
          <div className="date">
            更新日: {singleItem.editDate}
          </div>
        </div>

        <div id="description_area">
          {parse((singleItem.description.
            replace(/(\r\n|\r|\n)/g, '<br>')).
            replaceAll("[[", "<a href=\" ").
            replaceAll("]]", ` \" target="_blank" rel="noreferrer noopener">link</a>`))}
        </div>

        <div className="link_toAll">
          <Link href={`../../`}>一覧に戻る</Link>
        </div>

        <div className="forOwner">
          <div>
            <Link href={`/item/update/${singleItem._id}`}>編集</Link>

            <Link href={`/item/delete/${singleItem._id}`}>削除</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReadSingleItem;