import Link from "next/link"
// import Image from "next/image"

const getAllItems = async () => {

  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readall`, { cache: "no-store" });

  const jsonData = await response.json();
  const allItems = jsonData.allItems;

  //  投稿日順に並び替えられたやつ
  const sort_postDate = allItems.sort((a, b) => {
    const valA = a.postDate.toUpperCase();
    const valB = b.postDate.toUpperCase();
    if (valA < valB) {
      return 1;
    }
    if (valA > valB) {
      return -1;
    }
    // names must be equal
    return 0;
  });

  return sort_postDate;
}

const ReadAllItems = async () => {
  const allItems = await getAllItems();

  return (

    <div className="main">
      {allItems.map(item =>
        <div key={item._id} className="article">

          <h2>
            <Link href={`./item/readsingle/${item._id}`}>
              {item.title}
            </Link>
          </h2>

          {/* <Image src={item.image} width={750} height={500} alt="item-image" priority /> */}
          <div>

            <div className="date_box">
              <div className="date">投稿日: {item.postDate}</div>
            </div>

            <div className="date_box">
              <div className="date">更新日: {item.editDate}</div>
            </div>

            <div className="content">
              <p>{item.description.substring(0, 200)}...</p>
            </div>

            <div className="link_toSingle">
              <Link href={`./item/readsingle/${item._id}`}>
                view more
              </Link>
            </div>

          </div>
          {/* </Link> */}
        </div>

      )
      }

    </div >
  )
}

export default ReadAllItems