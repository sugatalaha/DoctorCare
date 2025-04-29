"use client";

import { useState, useEffect } from "react";
import Head from "next/head"; 

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    experience: "",
    location: "",
    fees: "",
  });

  const [doctors, setDoctors] = useState([]);
  const [filters, setFilters] = useState({
    minExperience: "",
    maxExperience: "",
    minFees: "",
    maxFees: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, [filters]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams(filters).toString();
      const res = await fetch(`https://doctorcare-phce.onrender.com/api/list-doctor-with-filter?${query}`);
      const data = await res.json();
      setDoctors(data.doctors || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://doctorcare-phce.onrender.com/api/add-doctor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("Doctor added successfully!");
        setForm({
          name: "",
          specialization: "",
          experience: "",
          location: "",
          fees: "",
        });
        fetchDoctors();
      } else {
        alert("Failed to add doctor.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="bg-white min-h-screen">
    <Head>
      <title>DoctorCare | Manage Doctors and Appointments</title>
      <meta name="description" content="Easily add, search and consult doctors online with DoctorCare. Manage your healthcare efficiently." />
      <meta name="keywords" content="DoctorCare, Online Doctors, Book Appointments, Healthcare Management, Find Doctors" />
      <meta name="author" content="DoctorCare Team" />
      <meta property="og:title" content="DoctorCare | Manage Doctors Online" />
      <meta property="og:description" content="DoctorCare helps you manage, add, and find doctors easily with modern tools." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://yourwebsite.com" />
      <meta property="og:image" content="https://yourwebsite.com/preview-image.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="DoctorCare | Manage Doctors" />
      <meta name="twitter:description" content="Find top doctors, manage appointments, and consult easily with DoctorCare." />
      <meta name="twitter:image" content="https://yourwebsite.com/preview-image.png" />
      <link rel="canonical" href="https://yourwebsite.com/" />
    </Head>
      {/* Navigation Header */}
      <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
        <div className="text-2xl font-bold">DoctorCare</div>
        <div className="flex space-x-6 text-lg">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Doctors</a>
          <a href="#" className="hover:underline">Appointments</a>
          <a href="#" className="hover:underline">Login</a>
          <a href="#" className="hover:underline">Sign Up</a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-8">
        {/* Header Section */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Doctor Management</h1>
          <p className="text-gray-500 mt-2 text-lg">Add and search doctors easily</p>
        </header>

        {/* Page Layout: Sidebar + Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="bg-gray-100 p-6 shadow rounded-lg h-fit">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Filters</h2>

            {/* Experience Filter */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2 text-gray-700">Experience (Years)</h3>
              <div className="flex flex-col space-y-2 text-gray-700">
                <label>
                  <input
                    type="checkbox"
                    name="experience"
                    onChange={() => setFilters({ ...filters, minExperience: 0, maxExperience: 5 })}
                  />
                  <span className="ml-2">0-5</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="experience"
                    onChange={() => setFilters({ ...filters, minExperience: 6, maxExperience: 10 })}
                  />
                  <span className="ml-2">6-10</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="experience"
                    onChange={() => setFilters({ ...filters, minExperience: 11, maxExperience: 16 })}
                  />
                  <span className="ml-2">11-16</span>
                </label>
              </div>
            </div>

            {/* Fees Filter */}
            <div>
              <h3 className="font-semibold mb-2 text-gray-700">Fees (₹)</h3>
              <div className="flex flex-col space-y-2 text-gray-700">
                <label>
                  <input
                    type="checkbox"
                    name="fees"
                    onChange={() => setFilters({ ...filters, minFees: 100, maxFees: 500 })}
                  />
                  <span className="ml-2">100-500</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="fees"
                    onChange={() => setFilters({ ...filters, minFees: 501, maxFees: 1000 })}
                  />
                  <span className="ml-2">500-1000</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Main Section */}
          <main className="col-span-3">
            {/* Doctors List */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Doctors</h2>
              {loading ? (
                <p className="text-gray-600">Loading doctors...</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {doctors.length ? doctors.map((doc) => (
                    <div key={doc._id} className="border p-4 rounded shadow hover:shadow-lg transition bg-white">
                      <h3 className="text-lg font-bold text-gray-800">{doc.name}</h3>
                      <p className="text-gray-600">{doc.specialization}</p>
                      <p className="text-gray-600">{doc.location}</p>
                      <p className="text-gray-600">{doc.experience} years experience</p>
                      <p className="text-blue-600 font-bold">₹{doc.fees}</p>
                    </div>
                  )) : (
                    <p className="text-gray-500">No doctors found.</p>
                  )}
                </div>
              )}
            </section>

            {/* Add Doctor Form */}
            <section className="bg-gray-50 p-6 shadow rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add Doctor</h2>
              <form onSubmit={handleAddDoctor} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="border p-2 rounded text-gray-800"
                />
                <input
                  type="text"
                  placeholder="Specialization"
                  value={form.specialization}
                  onChange={(e) => setForm({ ...form, specialization: e.target.value })}
                  className="border p-2 rounded text-gray-800"
                />
                <input
                  type="number"
                  placeholder="Experience (years)"
                  value={form.experience}
                  onChange={(e) => setForm({ ...form, experience: e.target.value })}
                  className="border p-2 rounded text-gray-800"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="border p-2 rounded text-gray-800"
                />
                <input
                  type="number"
                  placeholder="Fees"
                  value={form.fees}
                  onChange={(e) => setForm({ ...form, fees: e.target.value })}
                  className="border p-2 rounded text-gray-800"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 col-span-full"
                >
                  Add Doctor
                </button>
              </form>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
