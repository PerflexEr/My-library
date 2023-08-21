import $ from "../core";

$.prototype.get = async function (url, dataType = "json") {
  try {
    const res = await fetch(url, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`Network response was not ok: ${res.status}`);
    }

    switch (dataType) {
      case "json":
        return await res.json();
      case "text":
        return await res.text();
      case "blob":
        return await res.blob();
    }
  } catch (error) {
    throw new Error(`Fetch error: ${error.message}`);
  }
};

$.prototype.post = async function (url, data, dataType) {
  try {
    const res = await fetch(url, {
      method: "POST",
      body: data,
    });

    if (!res.ok) {
      throw new Error(`Network response was not ok: ${res.status}`);
    }

    switch (dataType) {
      case "json":
        return await res.json();
      case "text":
        return await res.text();
      case "blob":
        return await res.blob();
    }
  } catch (error) {
    throw new Error(`Fetch error: ${error.message}`);
  }
};

// $().get('https://jsonplaceholder.typicode.com/todos/2')
//       .then(json => console.log(json))