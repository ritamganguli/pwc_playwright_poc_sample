import type { Page } from "@playwright/test";

export async function GotoUrl(page:Page,url){
    await page.goto(url)
}

export async function MaximizeWindow(page:Page,screenWidth:number,screenHeight:number){
    await page.setViewportSize({width:screenWidth,height:screenHeight});
}

