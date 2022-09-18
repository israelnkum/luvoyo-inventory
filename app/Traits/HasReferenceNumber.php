<?php

namespace App\Traits;

trait HasReferenceNumber
{
    function generateReferenceNumber($referenceColumn): string
    {
        $countLogs = $this->withTrashed()->get()->count();
        $current_year = substr(date('Y'),2);
        $nextValue = str_pad(1, 3, '0', STR_PAD_LEFT);
        if ($countLogs == 0){
            $referenceNumber = $current_year.$nextValue;
        }else{

            $lastReferenceNumber = $this->withTrashed()->max($referenceColumn);

            if ($lastReferenceNumber == '' ){
                $referenceNumber= $current_year.$nextValue;
            } else {

                $account_year = substr($lastReferenceNumber,0, 2);
                if ($account_year == $current_year){
                    $referenceNumber = $lastReferenceNumber + 1;
                }else{
                    $referenceNumber = $current_year.$nextValue;
                }
            }
        }
        return  $referenceNumber;
    }
}
