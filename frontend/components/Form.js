import React from 'react';


function Form() {
  return (
    <div class="w-full max-w-xs mt-10">
        <form class="w-full max-w-sm">
        <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
            <label class="block text-blue-950 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                Full Name
            </label>
            </div>
            <div class="md:w-2/3">
            <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="name" aria-label="Full name" />
            </div>
        </div>
        <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
            <label class="block text-blue-950 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                Password
            </label>
            </div>
            <div class="md:w-2/3">
            <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="password" aria-label="Full name" />
            </div>
        </div>
        <div class="md:flex md:items-center">
            <div class="md:w-1/3"></div>
            <div class="md:w-2/3">
            <button class="bg-transparent text-blue-950 font-semibold hover:text-white py-2 px-4 border border-blue-950 hover:border-transparent rounded flex justify-center">
                Sign Up
            </button>
            </div>
        </div>
        </form>
    </div>
  )
}

export default Form
