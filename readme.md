# SAP FIORI Fill 40

## What it is

This is intended to be used as a bookmarklet which fill fill your SAP FIORI time sheet

## How to Setup

Create a new bookmark

1.  Give it whatever name you like
2.  Paste the contents of `copy-me.js` into the `URL` field of the bookmark form

## How to Use

1. Open the SAP FIORI timesheet page
2. click the bookmarklet
3. hit enter

## How it works

1. Will click "Enter Records"
2. Will take the first dropdown under "Assignment" and click the "+" button under the hours 8 times
3. It will focus the "Submit" button so you just have to hit "enter"

## Configuration

Change the number of hours entered by modifying the variable `hoursPerDay` in the `copy-me.js`
