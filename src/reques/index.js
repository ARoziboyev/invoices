const baseURL = import.meta.env.VITE_BASE_URL;

export async function getInvoise(query = "") {
  const req = await fetch(baseURL + (query ? `?status=${query}` : ""));
  if (req.status === 200) {
    const result = await req.json();
    return result.data;
  } else {
    throw new Error("xatolik mavjud");
  }
}
export async function getinvois(id) {
  const req = await fetch(`${baseURL + id}`);
  if (req.status === 200) {
    const result = await req.json();
    console.log(result);

    return result;
  } else {
    throw new Error("xatolik mavjud");
  }
}

export async function deleteById(id) {
  const req = await fetch(`${baseURL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!req.ok) {
    const errorData = await req.json().catch(() => null);
    throw new Error(errorData?.message || "O'chirishda xatolik");
  }
}

export async function addInvoice(data) {
  const req = await fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (req.status === 200) {
    const result = req.json();
    return result;
  } else {
    throw new Error("xatolik mavjud");
  }
}
export async function updateById(id, newData) {
  const req = await fetch(`${baseURL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });

  if (req.status === 200) {
    const result = await req.json();
    return result;
  } else {
    throw new Error("Xatolik mavjud");
  }
}
