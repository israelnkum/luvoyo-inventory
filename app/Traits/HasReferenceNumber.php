<?php

namespace App\Traits;

trait HasReferenceNumber
{

    public function generateReferenceNumber($referenceColumn): string
    {
        $countLogs = self::withTrashed()->get()->count();
        $current_year = substr(date('Y'),2);
        $current_month = date('m');
        $currentYearAndMonth = $current_year.$current_month;
        $nextValue = str_pad(1, 3, '0', STR_PAD_LEFT);
        if ($countLogs == 0){
            $referenceNumber = $currentYearAndMonth.$nextValue;
        }else{

            $lastReferenceNumber = self::withTrashed()->max($referenceColumn);

            if ($lastReferenceNumber == '' ){
                $referenceNumber = $this->prefix.$currentYearAndMonth.$nextValue;
            } else {

                $account_year = substr($lastReferenceNumber,3, 2);

                if ($account_year == $current_year){
                    $ref = substr($lastReferenceNumber, 3);
                    $referenceNumber = (int) $ref + 1;
                }else{
                    $referenceNumber = $currentYearAndMonth.$nextValue;
                }
            }
        }
        return  $this->prefix.$referenceNumber;
    }
}
