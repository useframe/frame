"use client";

import { LiquidMetal } from "@paper-design/shaders-react";
import styles from "./liquid-button.module.css";

export function LiquidButton() {
  return (
    <div className={styles.textBox}>
      {/* Liquid Metal Button */}
      <div className={styles.liquidMetal}>
        <div className={styles.outline}>
          <LiquidMetal
            shape="circle"
            colorBack="#00000000"
            colorTint="#FFFFFF"
            className={styles.liquidMetalShader}
          />
        </div>
      </div>
    </div>
  );
}
